import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { BsCart3 } from "react-icons/bs";
import { FaCircleUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/icon for user header.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { clearCart } from "../store/cartSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
//   const cartItems = useSelector(state=> state.cart.cart)

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearCart())
    navigate("/auth");
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/home">
          <img
            src={logo}
            alt="logo for user"
            style={{ width: "45px", height: "auto" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!isLoggedIn && (
              <Nav.Link as={Link} to="/auth">
                Login
              </Nav.Link>
            )}

            {isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/home">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/cart">
                  <BsCart3 size={25} />
                  Cart
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  <FaCircleUser size={25} />
                  Profile
                </Nav.Link>
                <Nav.Link as={Link} to="/myorders">
                  MyOrders
                </Nav.Link>
                <Button
                  variant="outline-light"
                  onClick={logoutHandler}
                  className="ms-2"
                >
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
