require.extensions['.css', '.scss'] = () => {
    return;
};

import path from 'path'
import express from 'express'
// import React from 'react'
import React, { Component } from 'react';
import { renderToString } from 'react-dom/server'
import { ChunkExtractor } from '@loadable/server'
import { matchPath, StaticRouter } from 'react-router';
import PropTypes from 'prop-types';
// import {rConf} from '@project/routes';
import fs from 'fs';
import ejs from 'ejs';

import App from './app/App';
import { routes } from './app/routes';

const app = express()

app.use(express.static(path.join(__dirname, 'dist')));


class DataProvider extends Component {
    getChildContext() {
        return { data: this.props.data };
    }
    render() {
        return <App {...this.props} />;
    }
}

DataProvider.propTypes = {
    data: PropTypes.object
};

DataProvider.childContextTypes = {
    data: PropTypes.object
};

const webStats = path.resolve(
    __dirname,
    'dist/bundle/loadable-stats.json',
)

app.get('*', (req, res) => {

    // console.log(routes)



    routes
        .filter(route => matchPath(req.url, route))
        .map(route => route.component)
        // .filter(comp => comp.serverFetch)
        .map(comp => {
            // console.log("Render Prpos", comp);
            comp.load().then((component) => {
                // console.log("loaded component", c.default)
                // console.log(c.default.fetchData);


                component.default.fetchData(req, function (data) {

                    console.log("Data Retrieved....")
                    // console.log("all done here...,", data)
                    //Pass req headers at context
                    
                    data.headers = req.headers;
                    data.headers.source = '';

                    const context = {};

                    const webExtractor = new ChunkExtractor({ statsFile: webStats })
                    // const jsx = webExtractor.collectChunks(<DataProvider data={data} />)

                    const jsx = webExtractor.collectChunks(<StaticRouter location={req.url} context={context}> <DataProvider data={data} /> </StaticRouter>)

                    const html = renderToString(jsx)

                    // console.log(context)
                    // context.url will contain the URL to redirect to if a <Redirect> was used
                    if (context.url) {
                        res.writeHead(302, {
                            Location: context.url
                        });
                        res.end();
                    } else {

                        // render header
                        res.set('content-type', 'text/html')

                        var Headerfile = fs.readFileSync(__dirname + '/views/head.ejs', 'utf-8');

                        var renderedScripts = {
                            linkTags: webExtractor.getLinkTags(),
                            styleTags: webExtractor.getStyleTags(),
                            scriptTags: webExtractor.getScriptTags()
                        }
                        var renderedHead = ejs.render(Headerfile, {
                            renderedScripts
                        });

                        res.write(renderedHead);

                        // render body

                        var bodyfile = fs.readFileSync(__dirname + '/views/index.ejs', 'utf-8');

                        //console.log(html);

                        var renderedBody = ejs.render(bodyfile, {
                            renderedScripts, data, html
                        });
                        // res.write(`<div id="main">${html}</div>`);

                        res.write(renderedBody);

                        res.end();

                    }



                });
                // const {type, payload} = comp.serverFetch;
                // return dispatch({type, payload});
            });
        });
})

// eslint-disable-next-line no-console
app.listen(9000, () => console.log('Server started http://localhost:9000'))
