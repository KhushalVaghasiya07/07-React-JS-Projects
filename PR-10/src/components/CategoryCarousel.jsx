import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import FlightAd from "../assets/FlipkartFlightBanner.png";
import "./BestOfElectronics.css";
import { Link } from "react-router-dom";

const CategoryCarousel = ({ title, category, showAd }) => {
  const [products, setProducts] = useState([]);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const itemsPerPage = 6;
  const maxItems = 12;

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => {
        const filtered = res.data.filter(
          (item) => item.category.toLowerCase() === category.toLowerCase()
        );
        setProducts(filtered.slice(0, maxItems)); // max 12 items
      })
      .catch((err) => console.log(err));
  }, [category]);

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
                      <Link to={`/explore/${item.category}`} className="text-decoration-none text-dark">
                        <div className="product-card">
                          <img src={item.image} alt={item.name} />
                          <p className="truncate">{item.name}</p>
                          <span>From ₹{item.price}</span>
                        </div>
                      </Link>
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
