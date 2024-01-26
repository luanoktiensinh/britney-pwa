// TODO @TW:
// Node path should be committed, but it makes preset dev impossible.
// Local path is the only way to develop "tailwind.preset.js".
const venia = require('@magento/pwa-theme-venia');
// const venia = require('../pwa-theme-venia');

const config = {
    mode: 'jit',
    // Include your custom theme here.
    presets: [venia],
    // Configure how Tailwind statically analyzes your code here.
    // Note that the Tailwind's `jit` mode doesn't actually use PurgeCSS.
    purge: {
        // Include paths to every file that may refer to Tailwind classnames.
        // Classnames not found in these files will be excluded at build time.
        content: [
            './node_modules/@magento/venia-ui/lib/**/*.module.css',
            '../venia-ui/lib/**/*.module.css',
            './src/**/*.module.css',
            './src/**/*.js',
            './template.html'
        ],
        // Extract Tailwind classnames from source files.
        // Our default matcher only matches targets of CSS Modules' `composes`,
        // not classnames included directly in HTML or JS!
        extractors: [
            {
                extensions: ['css'],
                extractor: content => content.match(matcher) || []
            }
        ]
    },
    // Set the character Tailwind uses when prefixing classnames with variants.
    // CSS Modules doesn't like Tailwind's default `:`, so we use `_`.
    separator: '_',
    theme: {
        extend: {
            aspectRatio: {
                'product': '3/4',
            },
            colors: {
                primary: {
                    400: '#1371b9',
                    500: '#035ea7',
                    600: '#03338F'
                },
                errors: {
                    500: '#ce4635',
                    600: '#b84141'
                },
            },
            fontSize: {
                xsl: '0.8125rem',
                sml: '0.9375rem',
                md: '1.125rem'
            },
            spacing: {
                '3.75': '0.9375rem',
                '4.5': '1.125rem',
                '1.25': '5px',
                '7.5': '1.875rem',
                '12.5': '3.125rem',
                '15': '3.75rem',
                '25': '6.25rem'
            },
            width: {
                'login-form': '28.25rem'
            },
            minWidth: {
                '4.5': '1.125rem',
            },
            boxShadow: {
                input: 'inset 0 1px 3px rgba(0, 0, 0, .05)',
                btn: '0 0 1px 0 rgba(0, 0, 0, .4)'
            }
        }
    }
};

module.exports = config;

/**
 * Matches declarations that contain tailwind classnames.
 * Only classnames matched by this expression will be included in the build.
 *
 * @example
 * .foo {
 *   composes: mx-auto from global;
 * }
 */
const matcher = /(?<=composes:.*)(\b\S+\b)(?=.*from global;)/g;
