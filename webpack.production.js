'use strict';

const debug = process.env.NODE_ENV !== 'production';
// const isModern = process.env.BROWSERSLIST_ENV === 'modern'
//const debug = false;
const webpack = require('webpack');
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const LoadablePlugin = require('@loadable/webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
// const TerserPlugin = require('terser-webpack-plugin-legacy');
//const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const bundleDir = 'bundle';

process.traceDeprecation = false;

const babelConfig = {
    presets: ['@babel/react', '@babel/env'],
    plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        'syntax-dynamic-import',
        // "transform-object-rest-spread",
        '@loadable/babel-plugin',
    ],
};
// const babelConfig = {
//     presets: ['react', "env"],
//     "plugins": [
//         "syntax-dynamic-import",
//         "transform-object-rest-spread"
//     ]
// }

const useCacheBabel = [
    {
        loader: 'cache-loader',
        options: {
            cacheDirectory: `.cache-loader`,
        },
    },
    {
        loader: 'babel-loader',
        options: babelConfig,
    },
];

const useCssLoader = [
    {
        loader: 'style-loader',
        options: {
            injectType: 'linkTag',
            insert: 'body',
        },
    },
    {
        loader: 'file-loader',
        options: {
            name: '../../css/[name].[hash].css',
            // depends on your project architecture
        },
    },
    {
        loader: 'sass-loader',
        options: {
            webpackImporter: true,
        },
    },
];

module.exports =
    //[
    {
        mode: 'production',
        devtool: false,
        entry: {
            main: path.join(__dirname, 'app', 'app-client.js'),
            // common: ['axios', 'react-router', 'plugins/zepto.min', 'utils/ReactLazy',/*'plugins/gsp_cookie','plugins/cd_global'*/]
        },
        // externals: {
        //     react: 'React',
        //     'react-dom': 'ReactDOM',
        // },
        output: {
            path: path.join(__dirname, 'dist', bundleDir),
            publicPath: '/' + bundleDir + '/',
            filename: `bundle.[chunkhash].js`,
            chunkFilename: `[name].[chunkhash].js`,
        },
        optimization: {
            namedModules: true, //NamedModulesPlugin()
            usedExports: true,
            splitChunks: {
                // CommonsChunkPlugin()
                name: false,
                maxAsyncRequests: 1,
                cacheGroups: {
                    // utils: {
                    //     test: /[\\/]utils[\\/]/,
                    //     name: 'utils',
                    //     chunks: 'all'
                    // },
                    common: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'common',
                        chunks: 'all',
                    },
                },
            },
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    cache: true,
                    sourceMap: false,
                    extractComments: false,
                    terserOptions: {
                        ecma: undefined,
                        warnings: false,
                        parse: {},
                        compress: {},
                        mangle: true, // Note `mangle.properties` is `false` by default.
                        module: false,
                        output: null,
                        toplevel: false,
                        nameCache: null,
                        ie8: false,
                        keep_classnames: undefined,
                        keep_fnames: false,
                        safari10: false,
                        output: {
                            comments: /@license/i,
                        },
                    },
                }),
            ],
        },
        plugins: debug
            ? []
            : [
                  new LoadablePlugin(),
                  new webpack.EnvironmentPlugin(['NODE_ENV']),
                  new ManifestPlugin({
                      fileName: 'manifest.json',
                  }),
                  // new BundleAnalyzerPlugin(),
                  new OptimizeJsPlugin({
                      sourceMap: false,
                  }),
              ],
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    include: path.resolve(__dirname),
                    use: useCacheBabel,
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    include: path.resolve(__dirname),
                    use: useCssLoader,
                },
            ],
        },
        resolve: {
            /*root : [
            path.resolve('./' + process.env.PRODUCT)
        ],
        fallback : [
            path.resolve('./src')
        ],*/
            extensions: ['.js', '.jsx', '.scss', '.css'],
            symlinks: false,
            cacheWithContext: false,
        },
        node: {
            //This due to Module not found: Error: Can't resolve 'child_process' in Memcahced
            //with reference http://www.programfaqs.com/faq/conditional-memcached-usage-in-isomorphic-application/
            net: 'empty',
            child_process: 'empty',
        },
    };
