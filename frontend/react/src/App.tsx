import { Route, Routes } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserProvider from "./components/UserProvider";
import ProtectedComponent from "./components/ProtectedComponent";
import GamePage from "./pages/GamePage";
import ScoreboardPage from "./pages/ScoreboardPage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/" Component={SiteLayout}>
            <Route path="/" Component={HomePage} element={""} />
            <Route
              path="login"
              element={
                <ProtectedComponent auth={false} element={<LoginPage />} />
              }
            />
            <Route
              path="register"
              element={
                <ProtectedComponent auth={false} element={<RegisterPage />} />
              }
            />
            <Route
              path="game"
              element={
                <ProtectedComponent auth={true} element={<GamePage />} />
              }
            />
            <Route
              path="scoreboard"
              element={
                <ProtectedComponent auth={true} element={<ScoreboardPage />} />
              }
            />
            <Route path="about" Component={AboutPage} />
          </Route>
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
