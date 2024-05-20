import axios from 'axios';
import Config from 'react-native-config';

const baseUrl = Config.API_SERVICE;
console.log(baseUrl);
export const api = axios.create({
    baseURL : baseUrl,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded", 
        "Accept": "application/json"
    }
});
