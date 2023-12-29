import { Container, Row } from "react-bootstrap";
import Navigation from "../components/navBar";
import { Outlet } from "react-router-dom";
function SitePageLayout() {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <Container fluid>
          <Row className="justify-content-center align-items-center vh-100 ">
            <Outlet />
          </Row>
        </Container>
        {/* <span className="d-block d-sm-none">xs</span>
        <span className="d-none d-sm-block d-md-none">sm</span>
        <span className="d-none d-md-block d-lg-none">md</span>
        <span className="d-none d-lg-block d-xl-none">lg</span>
        <span className="d-none d-xl-block d-xxl-none">xl</span>
        <span className="d-none d-xxl-block">xxl</span> */}
      </main>
    </>
  );
}

export default SitePageLayout;
