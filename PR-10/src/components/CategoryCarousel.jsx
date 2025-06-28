import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import FlightAd from "../assets/FlipkartFlightBanner.png";
import "./BestOfElectronics.css";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const CategoryCarousel = ({ title, category, showAd }) => {
  const [products, setProducts] = useState([]);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const itemsPerPage = 6;
  const maxItems = 12;
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => {
        const filtered = res.data.filter(
          (item) => item.category.toLowerCase() === category.toLowerCase()
        );
        setProducts(filtered.slice(0, maxItems));
      })
      .catch((err) => console.log(err));
  };

  const scrollRight = () => {
    if (visibleIndex + itemsPerPage < products.length) {
      setVisibleIndex((prev) => prev + 1);
    }
  };

  const scrollLeft = () => {
    if (visibleIndex > 0) {
      setVisibleIndex((prev) => prev - 1);
    }
  };

  const handleEdit = (product) => {
    navigate(`/add-product/${product.id}`, {
      state: { product }
    });
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/products/${productId}`);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product");
      }
    }
  };

  const visibleProducts = products.slice(visibleIndex, visibleIndex + itemsPerPage);

  return (
    <div className="electronics-wrapper">
      <div className="best-electronics-section d-flex justify-content-between align-items-start">
        <div className="electronic-cards d-flex flex-column w-100">
          <h2 className="m-0">{title}</h2>

          <div className="carousel-container position-relative">
            {visibleIndex > 0 && (
              <button className="scroll-btn" onClick={scrollLeft}>❮</button>
            )}

            <div className="product-carousel-wrapper">
              <div className="product-carousel">
                <Row className="g-3">
                  {visibleProducts.map((item) => (
                    <Col key={item.id} xs={6} sm={4} md={3} lg={2}>
                      <div className="product-card">
                        <Link to={`/product/${item.id}`} className="text-decoration-none text-dark product-link">
                          <div className="product-image-container">
                            <img src={item.image} alt={item.name} className="product-image" />
                          </div>
                          <div className="product-details">
                            <p className="product-name">{item.name}</p>
                            <div className="price-section">
                              <span className="current-price">₹{item.price.toLocaleString()}</span>
                              {item.originalPrice && (
                                <span className="original-price">₹{item.originalPrice.toLocaleString()}</span>
                              )}
                              {item.discount && (
                                <span className="discount">{item.discount}% off</span>
                              )}
                            </div>
                          </div>
                        </Link>

                        <div className="d-flex justify-content-center gap-3 mt-2 action-links">
                          <span
                            className="cursor-pointer"
                            title="Edit"
                            onClick={() => handleEdit(item)}
                          >
                            <FiEdit size={18} />
                          </span>
                          <span
                            className="cursor-pointer"
                            title="Delete"
                            onClick={() => handleDelete(item.id)}
                          >
                            <FiTrash2 size={18} />
                          </span>
                          <span
                            className="cursor-pointer"
                            title="View"
                            onClick={() => navigate(`/product/${item.id}`)}
                          >
                            <FiEye size={18} />
                          </span>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>

            {visibleIndex + itemsPerPage < Math.min(products.length, maxItems) && (
              <button className="scroll-btn right" onClick={scrollRight}>
                <svg width="20" height="20" fill="#878787" viewBox="0 0 24 24">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {showAd && (
          <div className="fixed-ad-card">
            <img src={FlightAd} alt="Flight Offer" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryCarousel;