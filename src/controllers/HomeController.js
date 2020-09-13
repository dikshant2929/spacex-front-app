import React from 'react';

import API from '../utils/api';
import PropTypes from 'prop-types';
import { objectToQueryParams } from '../utils';
import HomePage from '../views/HomePage';

const defaultProps = {
    offset: 0,
    launch_success: '',
    land_success: '',
    launch_year: '',
    limit: 8,
};

const getApiResponse = (props, cb) => {
    const options = setAPIOptions(props);
    API.get('HomePage', options)
        .then(({ data }) => {
            cb({ data, options });
        })
        .catch(error => {
            console.error(error);
            cb({ status: false, error: error.toString() });
            return;
        });
};

const setAPIOptions = req => {
    let requestParameters;

    if ('offset' in req && 'launch_year' in req && 'launch_success' in req) {
        requestParameters = req;
    } else {
        requestParameters = { ...defaultProps, ...req.query };
    }
    return {
        ...requestParameters,
    };
};

const contextTypes = {
    data: PropTypes.object,
};

class HomeController extends React.Component {
    //Server Side
    static fetchData(props, cb) {
        getApiResponse(props, function(d) {
            cb(d);
        });
    }

    //Client Side
    constructor(props, context) {
        super(props, context);
        const data = this.context.data || window.__INITIAL_STATE__;
        this.state = { ...{ requestParameters: defaultProps }, ...data };
    }

    updateRecords = ({ key, value }) => {
        const self = this;

        let data = self.state.data;
        const requestParameters = self.state.options;
        requestParameters[key] = requestParameters[key] !== value ? value : '';

        if (key !== 'offset') {
            requestParameters['offset'] = 0;
        }

        const queryParams = objectToQueryParams(requestParameters);
        // eslint-disable-next-line no-restricted-globals
        history.pushState({}, '', '/?'.concat(queryParams));
        self.setState({
            options: requestParameters,
        });

        getApiResponse(requestParameters, function(_data) {
            if (key === 'offset') {
                if (_data?.data?.length) {
                    data.push(..._data.data);
                }
            } else {
                data = _data.data;
            }
            self.setState({
                data,
            });
        });
    };

    render() {
        const { data, options } = this.state;
        return (
            <HomePage
                data={data}
                parameters={options}
                onChange={this.updateRecords}
            />
        );
    }
}

HomeController.contextTypes = contextTypes;
HomeController.defaultProps = defaultProps;
export default HomeController;
