import axios from 'axios';
import { getEnviroment } from '../helpers';

const baseUrl = getEnviroment("API_SERVICE");

export const api = axios.create({
    baseURL : baseUrl,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded", 
        "Accept": "application/json"
    }
});
