import { Route, Routes } from "react-router-dom";
import SiteLayout from "./layouts/site-page-layout";
import HomePage from "./pages/home-page";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={SiteLayout}>
          <Route path="/" Component={HomePage}/>
          <Route path="login" />
          <Route path="register" />
        </Route>
      </Routes>
    </>
  );
}

export default App;
