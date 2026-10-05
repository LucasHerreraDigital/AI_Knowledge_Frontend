import { create } from "zustand";

interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface AuthStore {
  user: AuthUser | null;
  token: string | null;

  setAuth: (user: AuthUser, token: string) => void;
  setToken:(token:string)=>void
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set)=>({
  user:null,
  token:null,

  setAuth:(user,token)=>
    set({
      user,token
    }),
    setToken:(token)=>
      set({
        token
      }),
      logout: ()=>
        set({
          user:null,
          token:null
        })
}));