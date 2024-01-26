import { NavBar } from "@/components/navbar";
import { Outlet } from "react-router-dom";
function SiteLayout() {
  return (
    <div className="absolute inset-0 flex flex-col">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default SiteLayout;
