import { Routes, Route } from "react-router-dom";
import SitePageLayout from "./layouts/siteLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SitePageLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  );
}
