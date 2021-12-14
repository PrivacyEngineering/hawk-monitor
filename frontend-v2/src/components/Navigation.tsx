import { Container, Nav, Navbar } from "react-bootstrap"
import { Link, useLocation } from "react-router-dom"

export const Navigation = () => {
  const location = useLocation();
  // console.log('location', location);

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        {/* <Navbar.Brand href="/">Transparency Dashboard</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" active={location.pathname === '/'}>Transparency Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/mappings" active={location.pathname === '/mappings'}>Configuration</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
