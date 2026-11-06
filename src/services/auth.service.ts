import { api,refreshApi } from "../api/axios";

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse{
  user:{
    id: string,
    name:string,
    email:string
  },
  accessToken:string
}

interface RefreshResponse{
  accessToken:string
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface MeResponse{
  id:string,
  name:string,
  email:string
}

export const login = async (data: LoginData) => {
  const response = await api.post<LoginResponse>("/auth/login", data);
  return response.data;
};

export const register = async (data: RegisterData) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const refresh = async ()=>{
  const response = await refreshApi.post<RefreshResponse>("/auth/refresh")
  return response.data
}

export const me = async ()=>{
  const response = await api.get<MeResponse>("/auth/me")
  return response.data
}

export const logout = async ()=>{
  await api.post("/auth/logout")
}