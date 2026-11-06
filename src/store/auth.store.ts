import { create } from "zustand";

interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface AuthStore {
  user: AuthUser | null;
  accessToken: string | null;
  initialized: boolean;

  setAuth: (user: AuthUser, accessToken: string) => void;
  setAccessToken: (accessToken: string) => void;
  clearAuth: () => void;
  setInitialized: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  accessToken: null,
  initialized: false,

  setAuth: (user, accessToken) =>
    set({
      user,
      accessToken,
    }),
  setAccessToken: (accessToken) =>
    set({
      accessToken,
    }),
  clearAuth: () =>
    set({
      user: null,
      accessToken: null,
    }),
    setInitialized: ()=>
      set({
        initialized:true
      })
}));
