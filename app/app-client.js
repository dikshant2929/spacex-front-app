import 'core-js';
import React from 'react';
import { hydrate } from 'react-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
//import { loadableReady } from '@loadable/component';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

class AppRoutes extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );
    }
}

window.onload = () => {
    const root = document.getElementById('main');
    hydrate(<AppRoutes />, root);
};
// loadableReady(() => {
//     const root = document.getElementById('main');
//     hydrate(<AppRoutes />, root);
// });
