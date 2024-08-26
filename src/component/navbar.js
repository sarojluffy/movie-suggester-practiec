import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Nav = () => {
  return (
    <>
      <Navbar className="bg-dark ">
        <Container className="text-light ">
          <Navbar.Brand href="#home">
            <Link to="/" className="text-light">
              Movie Suggester
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end d-grid gap-3 ">
            <Navbar.Text>
              {localStorage.getItem("token") ? (
                <>
                  <Link to="/profile" className="text-light ">
                    profile
                  </Link>
                </>
              ) : (
                <>
                  {" "}
                  <Link to="/login" className="text-light ">
                    login
                  </Link>{" "}
                  <br />
                </>
              )}
            </Navbar.Text>
            <Navbar.Text>
              <Link to="/add" className="text-light ">
                add movie
              </Link>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Nav;
