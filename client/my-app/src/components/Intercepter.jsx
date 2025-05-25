import axios from 'axios';
import store from '../redux/store'; // ייבוא הסטור של Redux

axios.interceptors.request.use((config) => {
    const token = store.getState().token.accessToken; // קבלת הטוקן מהסטור
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});