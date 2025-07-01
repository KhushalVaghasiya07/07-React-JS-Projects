import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import FlightAd from "../assets/FlipkartFlightBanner.png";
import "./BestOfElectronics.css";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsByCategory,
  deleteProduct,
} from "../redux/Actions/productActions";

const CategoryCarousel = ({ title, category, showAd }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [visibleIndex, setVisibleIndex] = useState(0);
  const itemsPerPage = 6;
  const maxItems = 12;

  const productsByCategory = useSelector(
    (state) => state.productCategory.productsByCategory || {}
  );

  const categoryProducts = productsByCategory[category] || [];
  const visibleProducts = categoryProducts.slice(
    visibleIndex,
    visibleIndex + itemsPerPage
  );

  useEffect(() => {
    dispatch(fetchProductsByCategory(category));
  }, [dispatch, category]);

  const scrollRight = () => {
    if (
      visibleIndex + itemsPerPage <
      Math.min(categoryProducts.length, maxItems)
    ) {
      setVisibleIndex((prev) => prev + 1);
    }
  };

  const scrollLeft = () => {
    if (visibleIndex > 0) {
      setVisibleIndex((prev) => prev - 1);
    }
  };

  const handleEdit = (product) => {
    navigate(`/add-product/${product.id || product.docId}`, {
      state: { product },
    });
  };

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(productId)).then(() => {
        dispatch(fetchProductsByCategory(category));
      });
    }
  };

  return (
    <div className="electronics-wrapper">
      <div className={`best-electronics-section ${showAd ? "has-ad" : ""}`}>
        <div className="electronic-cards">
          <h2>{title}</h2>

          <div className="carousel-container">
            {visibleIndex > 0 && (
              <button className="scroll-btn left" onClick={scrollLeft}>
                <svg width="20" height="20" fill="#878787" viewBox="0 0 24 24">
                  <path
                    d="M15 18l-6-6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </button>
            )}

            <div className="product-carousel-wrapper">
              <Row className="product-carousel">
                {visibleProducts.map((item) => (
                  <Col key={item.id || item.docId} xs={6} sm={4} md={3} lg={2}>
                    <div className="product-card">
                      <Link
                        to={`/product/${item.id || item.docId}`}
                        className="product-link"
                      >
                        <div className="product-image-container">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="product-image"
                          />
                        </div>
                        <div className="product-details">
                          <p className="product-name">{item.name}</p>
                          <div className="price-section">
                            <span className="current-price">
                              ₹{item.price?.toLocaleString()}
                            </span>
                            {item.originalPrice && (
                              <span className="original-price">
                                ₹{item.originalPrice.toLocaleString()}
                              </span>
                            )}
                            {item.discount && (
                              <span className="discount">
                                {item.discount}% off
                              </span>
                            )}
                          </div>
                          <div className="action-links">
                            <button
                              className="action-btn"
                              onClick={(e) => {
                                e.preventDefault();
                                handleEdit(item);
                              }}
                            >
                              <FiEdit size={16} />
                            </button>
                            <button
                              className="action-btn"
                              onClick={(e) => {
                                e.preventDefault();
                                handleDelete(item.id);
                              }}
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>

            {visibleIndex + itemsPerPage <
              Math.min(categoryProducts.length, maxItems) && (
                <button className="scroll-btn right" onClick={scrollRight}>
                  <svg width="20" height="20" fill="#878787" viewBox="0 0 24 24">
                    <path
                      d="M9 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
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
