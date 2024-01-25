import { NavBar } from "@/components/navbar";
import { Outlet } from "react-router-dom";
function SiteLayout() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default SiteLayout;
