import Avatar from "../common/Avatar";
import type { User } from "../../types/user";
import { logout } from "../../services/auth.service";
import { useAuthStore } from "../../store/auth.store";
import { LogOut } from "lucide-react";

interface SidebarFooterProps {
  user: User;
}

const SidebarFooter = ({ user }: SidebarFooterProps) => {
  
  const clearAuth = useAuthStore((state)=>state.clearAuth)

  const handleLogout = async ()=>{
    try{
      await logout()
    }catch{

    }finally{
      clearAuth()
    }
  }

  return (
    <div>
      <Avatar
        name={user.name}
      />
      <button className="flex" onClick={handleLogout}>
        <LogOut/> Cerrar Sesion
      </button>
    </div>
  );
};

export default SidebarFooter;