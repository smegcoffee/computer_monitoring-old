import axios from 'axios';

export default axios.create({
    baseURL: "10.10.2.194:9002",
    withCredentials: true
});