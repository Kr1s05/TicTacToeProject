import { Route, Routes } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserProvider from "./components/UserProvider";

function App() {
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/" Component={SiteLayout}>
            <Route path="/" Component={HomePage} />
            <Route path="login" Component={LoginPage} />
            <Route path="register" Component={RegisterPage} />
          </Route>
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
