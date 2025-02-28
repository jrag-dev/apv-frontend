import axios from "axios";


const instanceAxios = axios.create(
  {
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
    timeout: 1000,
  }
)

export default instanceAxios;