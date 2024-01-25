import { Route, Routes } from "react-router-dom";
import SiteLayout from "./layouts/site-page-layout";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={SiteLayout}>
          <Route path="login" />
          <Route path="register" />
        </Route>
      </Routes>
    </>
  );
}

export default App;
