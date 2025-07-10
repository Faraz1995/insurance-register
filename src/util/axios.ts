// src/lib/axios.ts
import axios from 'axios'
import Cookies from 'js-cookie'

const axiosInstance = axios.create({})

// Add access token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default axiosInstance
