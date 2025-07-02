import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import { BsCart3, BsThreeDotsVertical, BsPersonCircle } from 'react-icons/bs';
import { Button, NavDropdown, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loadCart } from '../redux/Actions/cartActions';
import { logoutUser } from '../redux/Actions/authActions'; // ✅ import logout action
import logo from '../assets/Flip_Card_logo.svg';
import './Header.css';
import { toast } from 'react-toastify';



const Header = ({ products = [], setFiltered = () => { } }) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { cartItems = [] } = useSelector((state) => state.cart || {});
  const { user } = useSelector((state) => state.authReducer || {});
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);



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
      toast.info("Please login to See Cart!");
      navigate('/Sign_In');
    } else {
      navigate('/cart');
    }
  };

  useEffect(() => {
    const userId = user?.uid || 'guest_cart';
    dispatch(loadCart(userId));
  }, [user, location.pathname, dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/'); // go to homepage after logout
  };

  return (
    <header className="header-container p-3">
      <div className="header-top d-flex justify-content-between align-items-center container">
        <div className="d-flex align-items-center right-side gap-3">
          <Link to="/">
            <img src={logo} alt="logo" width="90" />
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

        <div className="d-flex align-items-center gap-5">
          <NavDropdown
            title={
              <div className="d-flex align-items-center gap-2">
                <BsPersonCircle
                  size={20}
                  style={{
                    color: '#2874f0',
                    backgroundColor: '#fff',
                    borderRadius: '50%',
                    border: '1px solid #ccc',
                    padding: '2px',
                  }}
                />
                <span className="fw-semibold text-dark">
                  {user?.email ? user.email : 'Account'}
                </span>
              </div>
            }
            id="account-dropdown"
            menuVariant="light"
            className="d-flex align-items-center"
          >
            {!user?.email && (
              <>
                <NavDropdown.Item>
                  <span className="fw-semibold">New Customer?</span>
                  <Link to="/Sign_Up" className="ms-2 text-primary text-decoration-none">Sign Up</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/Sign_In" className="text-dark">Sign In</NavDropdown.Item>
              </>
            )}

            {user?.email && (
              <>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="#" className="text-dark">My Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="#" className="text-dark">Flipkart Plus Zone</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="#" className="text-dark">Orders</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="#" className="text-dark">Wishlist</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="#" className="text-dark">Gift Cards</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="text-danger fw-semibold">
                  Logout
                </NavDropdown.Item>
              </>
            )}
          </NavDropdown>

          <div
            onClick={handleCartClick}
            className="position-relative text-dark text-decoration-none d-flex align-items-center"
            style={{ cursor: "pointer" }}
          >
            <BsCart3 className="me-1 fs-5" />
            Cart
            {cartCount > 0 && (
              <Badge
                pill
                bg="danger"
                className="position-absolute"
                style={{
                  fontSize: '0.65rem',
                  top: '-13px',
                  right: '-10px',
                }}
              >
                {cartCount}
              </Badge>
            )}
          </div>


          <Button
            size="sm"
            className="btn btn-warning fw-semibold text-dark"
            onClick={handleProtectedClick}
          >
            + Add Product
          </Button>


          <BsThreeDotsVertical className="fs-5" />
        </div>
      </div>
    </header>
  );
};

export default Header;