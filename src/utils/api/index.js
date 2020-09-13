import axios from 'axios';
import { BASE_URL, EndPoints } from './config';

const SECONDS = 30;
const MILISECONDS = 1000;
const TIMEOUT = SECONDS * MILISECONDS;

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
});

const API = {
    get: (key, params = {}) => {
        return instance.get(EndPoints[key].url, {
            params,
        });
    },
};
export default API;
