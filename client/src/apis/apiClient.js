
import axios from 'axios';
const api = "http:192.168.1.20:3002/api" 

const instance = axios.create({
    baseURL: api,
  });
export default instance