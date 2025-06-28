import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductById } from '../redux/Actions/productActions';
import { addToCart } from '../redux/Actions/cartActions';
import {
  Container, Row, Col, Button, Badge, Alert, Spinner
} from 'react-bootstrap';
import {
  StarFill, StarHalf, Heart, HeartFill,
  Truck, ShieldCheck, ArrowLeft
} from 'react-bootstrap-icons';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading, error } = useSelector(state => state.productDetails);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const renderRatingStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    for (let i = 0; i < full; i++) stars.push(<StarFill key={`f-${i}`} className="text-warning" />);
    if (half) stars.push(<StarHalf key="half" className="text-warning" />);
    for (let i = stars.length; i < 5; i++) stars.push(<StarFill key={`e-${i}`} className="text-secondary" />);
    return stars;
  };

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger" className="text-center">
          Error loading product: {error}
        </Alert>
        <Button variant="light" onClick={() => navigate(-1)} className="mt-3">
          <ArrowLeft /> Back to Products
        </Button>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="my-5">
        <Alert variant="warning" className="text-center">
          Product not found
        </Alert>
        <Button variant="light" onClick={() => navigate(-1)} className="mt-3">
          <ArrowLeft /> Back to Products
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5 product-detail">
      <Button variant="light" onClick={() => navigate(-1)} className="mb-4">
        <ArrowLeft /> Back to Products
      </Button>

      <Row className="g-4">
        <Col md={6}>
          <div className="border rounded-3 p-3 mb-3 text-center">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid main-image"
              style={{ maxHeight: '400px', objectFit: 'contain' }}
            />
          </div>
          <Row className="g-2">
            {[1, 2, 3, 4].map((i) => (
              <Col xs={3} key={i}>
                <div className="border rounded-3 p-2 text-center thumbnail">
                  <img
                    src={product.image}
                    alt={`${product.name} thumbnail ${i}`}
                    className="img-fluid"
                    style={{ height: '80px', objectFit: 'contain' }}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </Col>

        <Col md={6}>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h1 className="mb-2">{product.name}</h1>
              <div className="d-flex align-items-center mb-3">
                <div className="me-2">{renderRatingStars(product.rating || 4.5)}</div>
                <span className="text-muted">({product.reviews || 124} reviews)</span>
              </div>
            </div>
            <Button variant="outline-danger" onClick={() => setIsWishlisted(!isWishlisted)}>
              {isWishlisted ? <HeartFill /> : <Heart />}
            </Button>
          </div>

          <h2 className="text-primary mb-0">₹{product.price?.toLocaleString()}</h2>
          {product.originalPrice && (
            <del className="text-muted ms-2">₹{product.originalPrice.toLocaleString()}</del>
          )}
          {product.discount && (
            <Badge bg="success" className="ms-2">{product.discount}% OFF</Badge>
          )}

          <div className="mb-3 mt-4">
            <h5>Description</h5>
            <p className="text-muted">{product.desc}</p>
          </div>

          {product.features && (
            <div className="mb-4">
              <h5>Features</h5>
              <ul>{product.features.map((f, i) => <li key={i}>{f}</li>)}</ul>
            </div>
          )}

          <div className="d-flex gap-3 mb-4">
            <div className="d-flex align-items-center me-3">
              <Truck className="text-success me-2" size={20} />
              <span>Free Delivery</span>
            </div>
            <div className="d-flex align-items-center">
              <ShieldCheck className="text-primary me-2" size={20} />
              <span>1 Year Warranty</span>
            </div>
          </div>

          <div className="d-flex gap-3 mb-4">
            <Button
              variant="primary"
              size="lg"
              className="flex-grow-1"
              onClick={() => dispatch(addToCart(product))}
            >
              Add to Cart
            </Button>
            <Button variant="outline-primary" size="lg" className="flex-grow-1">
              Buy Now
            </Button>
          </div>

          <Alert variant="info">
            <strong>Special Offer:</strong> Get 5% cashback on orders above ₹5000
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
