import axios from "axios";

export default axios.create({
  // baseURL: "https://desstrongmotors.com/monitoringback",
  // baseURL: "http://136.239.196.178:5001",
  // baseURL: "http://10.50.2.220:8000",
  baseURL: "http://localhost:8000",
  withCredentials: true,
});
