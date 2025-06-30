import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import { BsCart3, BsThreeDotsVertical, BsPersonCircle } from 'react-icons/bs';
import { Button, NavDropdown, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loadCart } from '../redux/Actions/cartActions';
import logo from '../assets/Flip_Card_logo.svg';
import './Header.css';

const Header = ({ products = [], setFiltered = () => { } }) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { cartItems = [] } = useSelector((state) => state.cart || {});
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  useEffect(() => {
    dispatch(loadCart('guest_cart'));
  }, [location.pathname, dispatch]);

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearch(keyword);

    const filtered = products.filter((item) =>
      item.name.toLowerCase().includes(keyword)
    );
    setFiltered(filtered);

    if (window.location.pathname !== '/') navigate('/');
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
              onChange={handleSearch}
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
                <span className="fw-semibold text-dark">Account</span>
              </div>
            }
            id="account-dropdown"
            menuVariant="light"
            className="d-flex align-items-center"
          >
            <NavDropdown.Item>
              <span className="fw-semibold">New Customer? </span>
              <Link to="#" className="ms-2 text-primary">Sign Up</Link>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>My Profile</NavDropdown.Item>
            <NavDropdown.Item>Flipkart Plus Zone</NavDropdown.Item>
            <NavDropdown.Item>Orders</NavDropdown.Item>
            <NavDropdown.Item>Wishlist</NavDropdown.Item>
            <NavDropdown.Item>Gift Cards</NavDropdown.Item>
          </NavDropdown>


          <Link
            to="/cart"
            className="position-relative text-dark text-decoration-none d-flex align-items-center"
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
          </Link>

          <Link to="/Add_Product">
            <Button size="sm" className="btn btn-warning fw-semibold text-dark">
              + Add Product
            </Button>
          </Link>

          <BsThreeDotsVertical className="fs-5" />
        </div>
      </div>
    </header>
  );
};

export default Header;
