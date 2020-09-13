import axios from 'axios';
import { BASE_URL, EndPoints } from './config';

const SECONDS = 30;
const MILISECONDS = 1000;
const TIMEOUT = SECONDS * MILISECONDS;

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    //console.log(config);
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });


const API = {
    get : (key, params = {}) => {
        return instance.get(EndPoints[key].url, {
            params
        })
    }
}
export default API;