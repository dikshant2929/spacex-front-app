import React from 'react';
import { Route, Switch } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies

// import './main.css'
import PropTypes from 'prop-types';

import Layout from '../src/components/Layout';

// import A from './letters/A';
// import B from './letters/B';

import { routes } from './routes';

const App = () => {
    return (
        <Layout>
            <Switch>
                {routes.map((item, index) => (
                    <Route
                        key={index}
                        path={item.path}
                        exact={item.exact}
                        component={({ history }) => {
                            return <item.component history={history} />;
                        }}
                    />
                ))}
            </Switch>
        </Layout>
    );
};

const contextTypes = {
    data: PropTypes.object,
};

App.contextTypes = contextTypes;
export default App;
