'use strict';

import React from 'react';

import API from '../utils/api';
import PropTypes from 'prop-types';
import { isUrlChanged } from '../utils';
import HomePage from '../views/HomePage';


const defaultProps = {
    offset : 0,
    launch_success : '',
    land_success : '',
    launch_year : '',
    limit : 20,
}


const getApiResponse = (props, cb) => {

    const options = setAPIOptions(props);
    API.get('HomePage', options).then(({data}) => {
        cb({data});
    }).catch((error) => {
        console.error(error);
        cb({ error: true, error: error.toString() });
        return;
    });
}

let setAPIOptions = (req ) => {
    console.log('SetAPIOptions');
    
    const requestParameters = {...defaultProps, ...req.query};
    console.log(requestParameters);
    return {
        ...requestParameters
    };
}

const contextTypes = {
    data: PropTypes.object
};


class HomeController extends React.Component {
    
    //Server Side
    static fetchData(props,cb){
        getApiResponse(props, function (d) {
            cb(d);
        });
    }
    
    //Client Side
    constructor(props, context) {
        super(props, context);
        const data = this.context.data || window.__INITIAL_STATE__;
        this.state = {...{requestParameters : defaultProps}, ...data};
    }

    componentWillReceiveProps(nextProps) {
        if (isUrlChanged(this.props.location, nextProps.location)) {
            this._fetchData(nextProps);
        } 
    }

    // componentDidMount(){
    //     if(window.__INITIAL_STATE__ == null){
    //         this._fetchData(this.props);
    //     }
    //     window.__INITIAL_STATE__ = null;
    // }

    _fetchData(props){
        let self = this;

        this.setState(defaultProps);
        
        getApiResponse(props, function(d){
            self.setState(d);
            history.pushState({},"",'/')
        });
    }

    updateRecords = ({key, value}) => {
        const self = this;
        
        let data = self.state.data;
        const requestParameters = self.state.requestParameters;
        requestParameters[key] = value;
        
        self.setState({
            requestParameters
        });

        getApiResponse(requestParameters, function(_data){
            
            if(key === 'offset'){
                if(_data?.data?.length) {
                    data.push(..._data.data);
                }
            }else{
                data = _data.data;
            }
            self.setState({
                data
            });
            console.log(data);
            //self.setState(d);
            //history.pushState({},"",'/')
        });
    }

    render() {
        const {data, error, requestParameters} = this.state;
        //console.log(this.state,this.props)
        return (
            <HomePage data={data} parameters={requestParameters} onChange={this.updateRecords}/>
        );
    }
}

HomeController.contextTypes = contextTypes;
HomeController.defaultProps = defaultProps;
export default HomeController;

// const HomePage = (props) => {
//     const context = useContext();
//     console.log(props, context);

//     return (
//         <h1>Home Page</h1>
//     );
// }

// HomePage.fetchData = (req, callback) => {
//     //console.log(req);
//     callback({
//         status : true,
//         data : [{
//             id : 1
//         }]
//     });
//}

