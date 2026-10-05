import Avatar from "../common/Avatar";
import type { User } from "../../types/user";

interface SidebarFooterProps {
  user: User;
}

const SidebarFooter = ({ user }: SidebarFooterProps) => {
  return (
    
    <Avatar
      name={user.name}
    />
  );
};

export default SidebarFooter;