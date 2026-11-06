import axios, { type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../store/auth.store";

interface RetryConfig extends InternalAxiosRequestConfig{
  _retry?:boolean
}
interface RefreshResponse{
  accessToken:string
}

export const api = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials:true
});

export const refreshApi = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials:true
})

let refreshPromise : Promise<string> | null = null

api.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use((response)=>{
    return response
  },async (error)=>{
    const originalRequest:RetryConfig = error.config 
    const isExcludedAuthRequest = originalRequest.url === "/auth/login" || originalRequest.url === "/auth/register" || originalRequest.url === "/auth/logout"
    if(error.response?.status === 401 && !originalRequest._retry && !isExcludedAuthRequest){
      originalRequest._retry = true;
      try{
        if (!refreshPromise){
          refreshPromise = refreshApi.post<RefreshResponse>("/auth/refresh").then((response)=>{
            return response.data.accessToken
          }).finally(()=>{
            refreshPromise = null
          })
        }
          const accessToken = await refreshPromise
          useAuthStore.getState().setAccessToken(accessToken)
          return api(originalRequest)
      }catch{
        useAuthStore.getState().clearAuth()
        return Promise.reject(error)
      }
      
    }
    return Promise.reject(error)
  })