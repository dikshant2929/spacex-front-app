
import React from 'react'
import { Route, Switch } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies

// import './main.css'
import PropTypes from 'prop-types';

import Layout from '../src/components/Layout';

// import A from './letters/A';
// import B from './letters/B';

import { routes } from './routes';

class App extends React.Component {

  constructor(props, context) {
    super(props, context);
    // this.state = this.context.data || window.__INITIAL_STATE__ || defaultProps;

  }

  render() { 
    return  (
            <Layout>
                <Switch>
                {routes.map((item, index) => (
                    
                    <Route key={index} path={item.path} exact={item.exact} component={({ history }) => {
                    
                        // console.log("sadfasdf", this.props, history);

                
                        return (
                        <item.component />
                        )
                    }}/>
                ))}

                    {/* {routes.map((route, index) => (
                        <Route key={index} {...route} />
                    ))} */}
                    {/* <Route exact path="/" component={A}/>
                    <Route path="/letter-b" component={B}/>
                    <Redirect path="/redirect" to="/letter-b"/> */}
                </Switch>
            </Layout>
      );
  }
}

const contextTypes = {
    data: PropTypes.object
};

App.contextTypes = contextTypes;
export default App