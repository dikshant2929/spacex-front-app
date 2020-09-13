import path from 'path';
import express from 'express';
import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import { ChunkExtractor } from '@loadable/server';
import { matchPath, StaticRouter } from 'react-router';
import PropTypes from 'prop-types';
import fs from 'fs';
import ejs from 'ejs';
import App from './app/App';
import { routes } from './app/routes';

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

if (process.env.NODE_ENV == 'dev') {
    console.log(
        '=============================',
        ' environment============================='
    );
    const config = require('./webpack.development');
    const port = process.env.PORT || 9000;
    let webpack, webpackMiddleware, webpackCompiler;
    webpack = require('webpack');
    webpackMiddleware = require('webpack-dev-middleware');
    webpackCompiler = webpack(config);

    app.use(
        webpackMiddleware(webpackCompiler, {
            publicPath: '/js-dev/',
            hot: true,
            stats: {
                colors: true,
            },
            watchOptions: {
                aggregateTimeout: 300,
                poll: true,
            },
        })
    );
    app.use(require('webpack-hot-middleware')(webpackCompiler));
}
class DataProvider extends Component {
    getChildContext() {
        return { data: this.props.data };
    }
    render() {
        return <App {...this.props} />;
    }
}

DataProvider.propTypes = {
    data: PropTypes.object,
};

DataProvider.childContextTypes = {
    data: PropTypes.object,
};

const webStats = path.resolve(__dirname, 'dist/bundle/loadable-stats.json');

app.get('*', (req, res) => {
    routes
        .filter(route => matchPath(req.url, route))
        .map(route => route.component)
        .map(comp => {
            comp.load().then(component => {
                component.default.fetchData(req, function(data) {
                    console.log('Data Retrieved....');
                    data.headers = req.headers;
                    data.headers.source = '';
                    const context = {};

                    const webExtractor = new ChunkExtractor({
                        statsFile: webStats,
                    });

                    const jsx = webExtractor.collectChunks(
                        <StaticRouter location={req.url} context={context}>
                            {' '}
                            <DataProvider data={data} />{' '}
                        </StaticRouter>
                    );

                    const html = renderToString(jsx);
                    // context.url will contain the URL to redirect to if a <Redirect> was used
                    if (context.url) {
                        res.writeHead(302, {
                            Location: context.url,
                        });
                        res.end();
                    } else {
                        // render header
                        res.set('content-type', 'text/html');

                        const Headerfile = fs.readFileSync(
                            __dirname + '/views/head.ejs',
                            'utf-8'
                        );

                        const renderedScripts = {
                            linkTags: webExtractor.getLinkTags(),
                            styleTags: webExtractor.getStyleTags(),
                            scriptTags: webExtractor.getScriptTags(),
                        };
                        const renderedHead = ejs.render(Headerfile, {
                            renderedScripts,
                        });

                        res.write(renderedHead);

                        // render body

                        const bodyfile = fs.readFileSync(
                            __dirname + '/views/index.ejs',
                            'utf-8'
                        );

                        const renderedBody = ejs.render(bodyfile, {
                            renderedScripts,
                            data,
                            html,
                        });
                        res.write(renderedBody);
                        res.end();
                    }
                });
            });
        });
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server started http://localhost:${PORT}`));
