import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import { BsCart3, BsThreeDotsVertical } from 'react-icons/bs';
import { CiShop } from 'react-icons/ci';
import { Button, NavDropdown } from 'react-bootstrap';
import logo from '../assets/Flip_Card_logo.svg';
import './Header.css';

const Header = ({ products = [], setFiltered = () => { } }) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

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
        {/* Logo & Search */}
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

        {/* Right Side */}
        <div className="d-flex align-items-center gap-4">
          {/* Login Dropdown */}
          <NavDropdown title="Login" id="login-dropdown" menuVariant="light">
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

          {/* Cart */}
          <Link to="/cart" className="text-dark text-decoration-none d-flex align-items-center">
            <BsCart3 className="me-1" />
            Cart
          </Link>

          {/* Become a Seller */}
          <Link to="/Add_Product" className="text-dark text-decoration-none d-flex align-items-center">
            <CiShop className="me-1 fs-5" />
            Become a Seller
          </Link>

          {/* Add Product Button */}
          <Link to="/Add_Product">
            <Button size="sm" className="btn btn-warning fw-semibold text-dark">+ Add Product</Button>
          </Link>

          {/* More Icon */}
          <BsThreeDotsVertical className="fs-5" />
        </div>
      </div>
    </header>
  );
};

export default Header;
