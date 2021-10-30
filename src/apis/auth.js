import api from './apiHelper';

export const postLogin = (apiKey, name) => api.post('/login', { apiKey, name });
