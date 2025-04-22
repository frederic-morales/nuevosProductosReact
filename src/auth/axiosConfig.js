//Pasamos el token a todas las peticiones HTTP
import axios from 'axios'

const token = localStorage.getItem('token')
const apiURL = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: apiURL
})

api.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
