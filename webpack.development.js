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
    presets: ['@babel/react', '@babel/env', 'react-hmre'],

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

module.exports = {
    mode: 'development',
    devtool: 'inline-sourcemap',
    entry: [
        'webpack-hot-middleware/client',
        path.join(__dirname, 'app', 'app-client.js'),
    ],
    // externals: {
    //     react: 'React',
    //     'react-dom': 'ReactDOM',
    // },
    output: {
        path: path.join(__dirname, 'dist', 'js-dev'),
        publicPath: '/js-dev/',
        filename: `bundle.js`,
        chunkFilename: `[name].chunk.js`,
    },
    plugins: [
        //new LoadablePlugin(),
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        // new BundleAnalyzerPlugin(),
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
