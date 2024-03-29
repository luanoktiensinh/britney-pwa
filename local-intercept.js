/* eslint-disable */
/**
 * Custom interceptors for the project.
 *
 * This project has a section in its package.json:
 *    "pwa-studio": {
 *        "targets": {
 *            "intercept": "./local-intercept.js"
 *        }
 *    }
 *
 * This instructs Buildpack to invoke this file during the intercept phase,
 * as the very last intercept to run.
 *
 * A project can intercept targets from any of its dependencies. In a project
 * with many customizations, this function would tap those targets and add
 * or modify functionality from its dependencies.
 */
// import moduleOverrideWebpackPlugin from './src/plugins/moduleOverrideWebpackPlugin';
const moduleOverrideWebpackPlugin = require('./moduleOverrideWebpackPlugin');
const componentOverrideMapping = require('./componentOverrideMapping');

const customRoutes = [
    {
        name: "Compare page",
        pattern: "/product_compare",
        path: require.resolve("./src/pages/compare")
    },
    {
        name: "Login page",
        pattern: "/login",
        path: require.resolve("./src/pages/login")
    },
    {
        name: "Register page",
        pattern: "/register",
        path: require.resolve("./src/pages/register")
    }
]
function localIntercept(targets) {
    targets.of('@magento/pwa-buildpack').webpackCompiler.tap(compiler => {
        new moduleOverrideWebpackPlugin(componentOverrideMapping).apply(compiler);
    });
    targets.of('@magento/pwa-buildpack').transformUpward.tap(def => {
        def.staticFromRoot.inline.body.file.template.inline = './my-static-assets/{{ filename }}';
    });
    targets.of("@magento/venia-ui").routes.tap(routes => {
        routes.push(...customRoutes);
        return routes;
    });
}

module.exports = localIntercept;
