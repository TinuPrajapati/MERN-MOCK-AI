import axios from "axios";

const Instance = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND}/api`,
    withCredentials:true
});

export default Instance;