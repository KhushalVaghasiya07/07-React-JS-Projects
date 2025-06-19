import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome, FaPlus, FaUtensils } from 'react-icons/fa';

export default function Layout({ children }) {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <FaUtensils className="me-2" />
            Recipe Book
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              <FaHome className="me-1" /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/add">
              <FaPlus className="me-1" /> Add Recipe
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container className="py-4">{children}</Container>
    </>
  );
}