import { NavBar } from "@/components/navbar";
import SocialFooter from "@/components/social-link-footer";
import { Outlet } from "react-router-dom";
function SiteLayout() {
  return (
    <div className="absolute inset-0 flex flex-col">
      <NavBar />
      <div className="flex flex-col bg-gray-100 dark:bg-gray-900 grow">
        <Outlet />
      </div>
      <SocialFooter />
    </div>
  );
}

export default SiteLayout;
