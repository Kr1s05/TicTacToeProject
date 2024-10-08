import { NavBar } from "@/components/NavBar";
import SocialFooter from "@/components/SocialFooter";
import { Outlet } from "react-router-dom";
function SiteLayout() {
  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-col bg-gray-100 dark:bg-gray-900 grow">
        <Outlet />
      </div>
      <SocialFooter />
    </div>
  );
}

export default SiteLayout;
