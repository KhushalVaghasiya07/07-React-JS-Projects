import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import { BsCart3, BsThreeDotsVertical, BsPersonCircle } from 'react-icons/bs';
import { MdOutlineStorefront } from "react-icons/md";
import { Button, NavDropdown, Badge, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loadCart } from '../redux/Actions/cartActions';
import { logoutUser } from '../redux/Actions/authActions';
import logo from '../assets/Flip_Card_logo.svg';
import './Header.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = ({ products = [], setFiltered = () => { } }) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { cartItems = [] } = useSelector((state) => state.cart || {});
  const { user } = useSelector((state) => state.authReducer || {});
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  useEffect(() => {
    const userId = user?.uid || 'guest_cart';
    dispatch(loadCart(userId));
  }, [user, location.pathname, dispatch]);

  const handleProtectedClick = () => {
    if (!user) {
      toast.info("Please login first to add a product!");
      navigate('/Sign_In');
    } else {
      navigate('/add_product');
    }
  };

  const handleCartClick = () => {
    if (!user) {
      toast.info("Please login to see your cart!");
      navigate('/Sign_In');
    } else {
      navigate('/cart');
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("You have been logged out!", {
      position: "top-right",
      autoClose: 3000,
    });
    navigate('/');
  };

  const getAvatarContent = () => {
    if (user?.email) {
      return (
        <div className="avatar-circle">
          {user.email.charAt(0).toUpperCase()}
        </div>
      );
    }
    return (
      <BsPersonCircle
        size={20}
        className="account-icon"
      />
    );
  };

  return (
    <header className="header-container p-3">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Desktop View */}
      <div className="header-top d-none d-md-flex justify-content-between align-items-center container">
        <div className="d-flex align-items-center right-side gap-3">
          <Link to="/">
            <img src={logo} alt="logo" width="90" className="logo-img" />
          </Link>
          <div className="search-bar d-flex align-items-center">
            <IoSearchOutline className="search-icon fs-5" />
            <input
              className="search-input"
              placeholder="Search for products, Brands and More"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="d-flex align-items-center gap-5 header-right-section">
          <NavDropdown
            title={
              <div className="d-flex align-items-center gap-1 account-dropdown-toggle">
                {getAvatarContent()}
              </div>
            }
            id="account-dropdown"
            menuVariant="light"
            align="end"
          >
            {!user?.email && (
              <>
                <NavDropdown.Item>
                  <span className="fw-semibold">New Customer?</span>
                  <Link to="/Sign_Up" className="ms-2 text-primary text-decoration-none">
                    Sign Up
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/Sign_In" className="text-dark">
                  Sign In
                </NavDropdown.Item>
              </>
            )}

            {user?.email && (
              <>
                <div className="dropdown-user-info px-3 py-2">
                  <div className="avatar-circle-large">
                    {user.email.charAt(0).toUpperCase()}
                  </div>
                  <div className="user-email">{user.email}</div>
                </div>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="#" className="text-dark">
                  My Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="#" className="text-dark">
                  Flipkart Plus Zone
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/my-orders" className="text-dark">
                  Orders
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="#" className="text-dark">
                  Wishlist
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="#" className="text-dark">
                  Gift Cards
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="text-danger fw-semibold">
                  Logout
                </NavDropdown.Item>
              </>
            )}
          </NavDropdown>

          <Link to="/" className="text-dark d-flex align-items-center seller-link text-decoration-none">
            <MdOutlineStorefront className="me-1 fs-5" />
            <span className="d-none d-md-inline">Become a Seller</span>
          </Link>

          <div
            onClick={handleCartClick}
            className="position-relative text-dark text-decoration-none d-flex align-items-center cart-icon"
            style={{ cursor: 'pointer' }}
          >
            <BsCart3 className="me-1 fs-5" />
            <span className="cart-text">Cart</span>
            {cartCount > 0 && (
              <Badge
                pill
                bg="danger"
                className="position-absolute cart-badge"
              >
                {cartCount}
              </Badge>
            )}
          </div>

          <Button
            size="sm"
            className="btn btn-warning fw-semibold text-dark add-product-btn"
            onClick={handleProtectedClick}
          >
            {user ? '+ Add Product' : 'Login'}
          </Button>

          <BsThreeDotsVertical className="fs-5 more-icon" />
        </div>
      </div>

      {/* Mobile View */}
      <div className="d-flex d-md-none align-items-center justify-content-between mobile-header">
        {/* Logo */}
        <Link to="/" className="mobile-logo">
          <img src={logo} alt="logo" width="70" />
        </Link>

        {/* Search Bar */}
        <div className="mobile-search-bar d-flex align-items-center">
          <IoSearchOutline className="search-icon fs-5" />
          <input
            className="search-input"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Mobile Dropdown */}
        <Dropdown className="mobile-dropdown">
          <Dropdown.Toggle variant="light" id="mobile-dropdown-toggle">
            <BsThreeDotsVertical className="fs-5" />
          </Dropdown.Toggle>

          <Dropdown.Menu align="end" className="mobile-dropdown-menu">
            <Dropdown.Item as={Link} to="#" className="d-flex align-items-center">
              {getAvatarContent()}
              <span className="ms-2">{user ? 'Account' : 'Login'}</span>
            </Dropdown.Item>

            <Dropdown.Item onClick={handleCartClick} className="d-flex align-items-center">
              <BsCart3 className="me-2 fs-5" />
              <span>Cart</span>
              {cartCount > 0 && (
                <Badge pill bg="danger" className="ms-2">
                  {cartCount}
                </Badge>
              )}
            </Dropdown.Item>

            <Dropdown.Item onClick={handleProtectedClick} className="d-flex align-items-center">
              <span>{user ? '+ Add Product' : 'Login'}</span>
            </Dropdown.Item>

            <Dropdown.Item as={Link} to="/" className="d-flex align-items-center">
              <MdOutlineStorefront className="me-2 fs-5" />
              <span>Seller</span>
            </Dropdown.Item>

            {user?.email && (
              <>
                <Dropdown.Divider />
                <Dropdown.Item as={Link} to="/my-orders">My Orders</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout} className="text-danger">
                  Logout
                </Dropdown.Item>
              </>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;