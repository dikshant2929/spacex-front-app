'use strict';

const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
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
    output: {
        path: path.join(__dirname, 'dist', 'js-dev'),
        publicPath: '/js-dev/',
        filename: `bundle.js`,
        chunkFilename: `[name].chunk.js`,
    },
    plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
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
        extensions: ['.js', '.jsx', '.scss', '.css'],
        symlinks: false,
        cacheWithContext: false,
    },
    node: {
        net: 'empty',
        child_process: 'empty',
    },
};
