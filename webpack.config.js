const { configureWebpack, graphQL } = require('@magento/pwa-buildpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const webpack = require('webpack');
const fs = require('fs');
const { promisify } = require('util');
const path = require('path');
const {
    getMediaURL,
    getStoreConfigData,
    getAvailableStoresConfigData,
    getPossibleTypes
} = graphQL;

const { DefinePlugin } = webpack;
// const { LimitChunkCountPlugin } = webpack.optimize;

const getCleanTemplate = templateFile => {
    return new Promise(resolve => {
        fs.readFile(templateFile, 'utf8', (err, data) => {
            resolve(
                data.replace(
                    /(?<inlineddata><!-- Inlined Data -->.*\s<!-- \/Inlined Data -->)/gs,
                    ''
                )
            );
        });
    });
};

module.exports = async env => {
    const isDevelopment = env.mode === 'development';
    /**
     * configureWebpack() returns a regular Webpack configuration object.
     * You can customize the build by mutating the object here, as in
     * this example. Since it's a regular Webpack configuration, the object
     * supports the `module.noParse` option in Webpack, documented here:
     * https://webpack.js.org/configuration/module/#modulenoparse
     */
    const config = await configureWebpack({
        context: __dirname,
        vendor: [
            '@apollo/client',
            'apollo-cache-persist',
            'informed',
            'react',
            'react-dom',
            'react-feather',
            'react-redux',
            'react-router-dom',
            'redux',
            'redux-actions',
            'redux-thunk'
        ],
        special: {
            'react-feather': {
                esModules: true
            }
        },
        resolve: {
            alias: {
                'src': path.resolve(__dirname, 'src')
            }
        },
        env
    });

    const mediaUrl = await getMediaURL();
    const storeConfigData = await getStoreConfigData();
    const { availableStores } = await getAvailableStoresConfigData();
    const writeFile = promisify(fs.writeFile);

    /**
     * Loop the available stores when there is provided STORE_VIEW_CODE
     * in the .env file, because should set the store name from the
     * given store code instead of the default one.
     */
    const availableStore = availableStores.find(
        ({ store_code }) => store_code === process.env.STORE_VIEW_CODE
    );

    global.MAGENTO_MEDIA_BACKEND_URL = mediaUrl;
    global.LOCALE = storeConfigData.locale.replace('_', '-');
    global.AVAILABLE_STORE_VIEWS = availableStores;

    const possibleTypes = await getPossibleTypes();

    const htmlWebpackConfig = {
        filename: 'index.html',
        minify: {
            collapseWhitespace: true,
            removeComments: true
        },
        templateParameters: (compilation, assets, options) => {
            return {
                compilation: compilation,
                webpack: compilation.getStats().toJson(),
                webpackConfig: compilation.options,
                htmlWebpackPlugin: {
                    files: {
                        css: assets.css,
                        js: assets.js,
                        chunks: assets.chunks,
                        preloadedCss: '/css/client.css',
                    },
                    options: options
                }
            }
        }
    };

    // Strip UPWARD mustache from template file during watch
    if (
        process.env.npm_lifecycle_event &&
        process.env.npm_lifecycle_event.includes('watch')
    ) {
        const devTemplate = await getCleanTemplate('./template.html');

        // Generate new gitignored html file based on the cleaned template
        await writeFile('template.generated.html', devTemplate);
        htmlWebpackConfig.template = './template.generated.html';
    } else {
        htmlWebpackConfig.template = './template.html';
    }

    config.module.noParse = [
        /@adobe\/adobe\-client\-data\-layer/,
        /braintree\-web\-drop\-in/
    ];
    config.module.rules.push(...[
        {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: ['file-loader']
        }
    ]);
    config.plugins = [
        ...config.plugins,
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            ignoreOrder: true,
            attributes: {
                defer: ''
            }
        }),
        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'server',
        //     analyzerHost: '127.0.0.1',
        //     analyzerPort: 8888,
        //     openAnalyzer: true
        // }),
        new DefinePlugin({
            /**
             * Make sure to add the same constants to
             * the globals object in jest.config.js.
             */
            POSSIBLE_TYPES: JSON.stringify(possibleTypes),
            STORE_NAME: availableStore
                ? JSON.stringify(availableStore.store_name)
                : JSON.stringify(storeConfigData.store_name),
            STORE_VIEW_CODE: process.env.STORE_VIEW_CODE
                ? JSON.stringify(process.env.STORE_VIEW_CODE)
                : JSON.stringify(storeConfigData.code),
            AVAILABLE_STORE_VIEWS: JSON.stringify(availableStores),
            DEFAULT_LOCALE: JSON.stringify(global.LOCALE),
            DEFAULT_COUNTRY_CODE: JSON.stringify(
                process.env.DEFAULT_COUNTRY_CODE || 'US'
            ),
            __DEV__: process.env.NODE_ENV !== 'production'
        }),
        new HTMLWebpackPlugin(htmlWebpackConfig)
    ];
    config.devServer = {
        'host': '0.0.0.0',
        'port': 36369,
        'public': 'pwa-docker.local',
        proxy: [
            {
                context: ['/media', '/graphql', '/static'],
                target: process.env.MAGENTO_BACKEND_URL,
                changeOrigin: true,
            }
        ],
        historyApiFallback: { disableDotRule: true }
    };

    /*
    Commenting out this section until SSR is fully implemented
    */
    const serverConfig = Object.assign({}, config, {
        target: 'node',
        devtool: false,
        module: { ...config.module },
        name: 'server-config',
        output: {
            ...config.output,
            filename: '[name].[hash].SERVER.js',
            strictModuleExceptionHandling: true
        },
        optimization: {
            minimize: !isDevelopment
        },
        plugins: [...config.plugins]
    });

    // TODO: get LocalizationPlugin working in Node
    const browserPlugins = new Set()
        .add('HtmlWebpackPlugin')
        .add('LocalizationPlugin')
        .add('ServiceWorkerPlugin')
        .add('VirtualModulesPlugin')
        .add('WebpackAssetsManifest');

    // remove browser-only plugins
    serverConfig.plugins = serverConfig.plugins.filter(
        plugin => !browserPlugins.has(plugin.constructor.name)
    );

    // remove browser-only module rules
    serverConfig.module.rules = serverConfig.module.rules.map(rule => {
        if (`${rule.test}` === '/\\.css$/') {
            return {
                ...rule,
                oneOf: rule?.oneOf?.map(ruleConfig => ({
                    ...ruleConfig,
                    use: ruleConfig.use.filter(
                        loaderConfig => loaderConfig.loader !== 'style-loader'
                    )
                }))
            };
        }

        return rule;
    });

    // add LimitChunkCountPlugin to avoid code splitting
    // serverConfig.plugins.push(
    //     new LimitChunkCountPlugin({
    //         maxChunks: 1
    //     })
    // );
    config.output = {
        filename: 'js/[name].js',
        publicPath: '/',
        path: path.resolve(__dirname, './dist'),
    }
    Object.assign(config.optimization.splitChunks.cacheGroups, {
        lodash: {
            test: /[\\/]node_modules[\\/]lodash[\\/]?/,
            chunks: 'all',
            name: 'lodash',
            priority: 40
        },
        react: {
            test: /[\\/]node_modules[\\/](react|redux)[\\/]?/,
            chunks: 'all',
            name: 'react',
            priority: 40
        },
        informed: {
            test: /[\\/]node_modules[\\/]informed[\\/]?/,
            chunks: 'all',
            name: 'informed',
            priority: 50
        }
    })
    config.module.rules[2].oneOf.forEach(rule => {
        rule.use = rule.use.filter(rule => rule.loader !== 'style-loader');
        rule.use.unshift(MiniCssExtractPlugin.loader)
    });
    const ruleScss = config.module.rules[4];
    ruleScss.use = ruleScss.use.filter(rule => rule !== 'style-loader');
    ruleScss.use.unshift(MiniCssExtractPlugin.loader)
    if(!isDevelopment) {
        if(!Array.isArray(config.optimization.minimizer)) {
            config.optimization.minimizer = [];
        }
        config.optimization.minimizer.push(new CssMinimizerPlugin())
    }
    return [config];
};
