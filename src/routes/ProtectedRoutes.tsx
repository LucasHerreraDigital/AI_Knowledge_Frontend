import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

const ProtectedRoute = () => {
  
  const initialized = useAuthStore((state)=>state.initialized)
  const token = useAuthStore((state) => state.accessToken);


  if (!initialized){
    return <h1>cargando...</h1>
  }
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;