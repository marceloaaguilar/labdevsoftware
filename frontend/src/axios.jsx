import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_AXIOS_BASE_URL;

export default axios;