import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import useAuth from './useAuth'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

const useAxiosSecure = () => {
  const { user, logOut, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    //  Register interceptors immediately — no user/loading condition
    const requestInterceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        if (user) {
          try {
            const token = await user.getIdToken()
            config.headers.Authorization = `Bearer ${token}`
          } catch (error) {
            console.error('Failed to get token:', error)
          }
        }
        return config
      }
    )

    const responseInterceptor = axiosInstance.interceptors.response.use(
      res => res,
      err => {
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          if (!loading) { //  don't log out during auth loading
            logOut()
              .then(() => navigate('/login'))
              .catch(console.error)
          }
        }
        return Promise.reject(err)
      }
    )

    // ✅ Always clean up on unmount
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor)
      axiosInstance.interceptors.response.eject(responseInterceptor)
    }
  }, [user, loading, logOut, navigate]) // keep deps so token stays fresh

  return axiosInstance
}

export default useAxiosSecure