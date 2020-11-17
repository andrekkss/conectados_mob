import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.7:3000/',
});

export const setAuthHeader =(token)=> {
   axios.defaults.headers.common['auth'] = token;
}
export default api;