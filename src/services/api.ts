import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.100.37:3333',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  // baseURL: 'http://localhost:3333',
});

export default api;