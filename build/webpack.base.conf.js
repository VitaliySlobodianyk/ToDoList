const path = require('path');
const fs = require('fs');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const PrettierPlugin = require('prettier-webpack-plugin');
const TypeScriptPlugin = require('ts-loader');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    js: 'js/',
    styles: 'styles/',
    img: 'img/',
};

const PAGES_DIR = PATHS.src;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.html'));

module.exports = {
    // BASE config

    externals: {
        paths: PATHS,
    },
    entry: {
        app: `${PATHS.src}/ts/index.ts`,
    },
    output: {
        filename: `${PATHS.js}/[name].js`,
        path: PATHS.dist,
        publicPath: './',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: ['babel-loader', 'eslint-loader'],
            },
            {
                test: /\.(jpg|gif|svg|png)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: { config: { path: `./postcss.config.js` } },
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {},
                    },
                    {
                        loader: 'postcss-loader',
                        options: { config: { path: `./postcss.config.js` } },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.styles}[name].css`,
        }),
        new CopyWebpackPlugin([{ from: `${PATHS.src}/img`, to: `${PATHS.img}` }]),
        // new PrettierPlugin({
        //     printWidth: 120,
        //     tabWidth: 2,
        //     useTabs: false,
        //     semi: true,
        //     singleQuote: true,
        //     encoding: 'utf-8',
        //     extensions: ['.js']
        // }),
        ...PAGES.map(
            page =>
            new HtmlWebpackPlugin({
                template: `${PAGES_DIR}/${page}`,
                filename: `./${page}`,
            }),
        ),
    ],
};