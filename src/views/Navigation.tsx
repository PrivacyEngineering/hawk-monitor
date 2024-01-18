import { Container, Nav, Navbar } from "react-bootstrap"
import { Link, useLocation } from "react-router-dom"

export const Navigation = () => {
  const location = useLocation();

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand>Transparency Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" active={location.pathname === '/'}>Home</Nav.Link>
            <Nav.Link as={Link} to="/fields" active={location.pathname.startsWith('/fields')}>Fields</Nav.Link>
            <Nav.Link as={Link} to="/mappings" active={location.pathname.startsWith('/mappings')}>Mappings</Nav.Link>
            <Nav.Link as={Link} to="/jobs" active={location.pathname.startsWith('/jobs')}>Jobs</Nav.Link>
            <Nav.Link as={Link} to="/requests" active={location.pathname.startsWith('/requests')}>Requests</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
