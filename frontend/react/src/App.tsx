import { Route, Routes } from "react-router-dom";
import SiteLayout from "./layouts/site-page-layout";
import HomePage from "./pages/home-page";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={SiteLayout}>
          <Route path="/" Component={HomePage} />
          <Route path="login" Component={LoginPage} />
          <Route path="register" Component={RegisterPage} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
