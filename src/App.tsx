import './App.css'
import AppRoutes from './routes/AppRouter'
import { useEffect } from 'react'
import { useAuthStore } from './store/auth.store'
import {refresh,me} from "./services/auth.service"

function App() {
  
  const setAccessToken = useAuthStore((state)=>state.setAccessToken)
  const setAuth = useAuthStore((state)=>state.setAuth)
  const clearAuth = useAuthStore((state)=>state.clearAuth)
  const setInitialized = useAuthStore((state)=>state.setInitialized)

  useEffect(()=>{
    const initializeAuth = async ()=>{
      try{
        const refreshData = await refresh()
        setAccessToken(refreshData.accessToken)
        const meData = await me()
        setAuth(meData,refreshData.accessToken)
      }catch{
        clearAuth()
      }finally{
        setInitialized()
      }
    }
    initializeAuth()
  },[])

  return (
      <AppRoutes />
  )
}

export default App
