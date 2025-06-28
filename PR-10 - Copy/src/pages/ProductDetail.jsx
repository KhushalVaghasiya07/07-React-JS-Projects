import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/Actions';
import { Container, Row, Col, Button, Badge, Alert } from 'react-bootstrap';
import { StarFill, StarHalf, Heart, HeartFill, Truck, ShieldCheck, ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import "./ExploreMore.css"

const ProductDetail = () => {
  const { id } = useParams();
  const product = useSelector(state => state.products.find(p => p.id === id));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = React.useState(false);

  if (!product) return (
    <Container className="my-5">
      <Alert variant="danger" className="text-center">
        Product not found
      </Alert>
    </Container>
  );

  // Calculate rating stars
  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarFill key={`full-${i}`} className="text-warning" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="text-warning" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarFill key={`empty-${i}`} className="text-secondary" />);
    }

    return stars;
  };

  return (
    <Container className="my-5 product-detail">
      <Button variant="light" onClick={() => navigate(-1)} className="mb-4">
        <ArrowLeft /> Back to Products
      </Button>

      <Row className="g-4">
        {/* Product Images */}
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

        {/* Product Info */}
        <Col md={6}>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h1 className="mb-2">{product.name}</h1>
              <div className="d-flex align-items-center mb-3">
                <div className="me-2">
                  {renderRatingStars(product.rating || 4.5)}
                </div>
                <span className="text-muted">({product.reviews || 124} reviews)</span>
              </div>
            </div>
            <Button
              variant="outline-danger"
              onClick={() => setIsWishlisted(!isWishlisted)}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              {isWishlisted ? <HeartFill /> : <Heart />}
            </Button>
          </div>

          <div className="mb-4">
            <h2 className="text-primary mb-0">₹{product.price.toLocaleString()}</h2>
            {product.originalPrice && (
              <del className="text-muted ms-2">₹{product.originalPrice.toLocaleString()}</del>
            )}
            {product.discount && (
              <Badge bg="success" className="ms-2">{product.discount}% OFF</Badge>
            )}
          </div>

          <div className="mb-4">
            <h5>Description</h5>
            <p className="text-muted">{product.desc}</p>
          </div>

          {product.features && (
            <div className="mb-4">
              <h5>Features</h5>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="d-flex flex-wrap gap-2 mb-4">
            <div className="d-flex align-items-center me-3">
              <Truck className="text-success me-2" size={20} />
              <span>Free Delivery</span>
            </div>
            <div className="d-flex align-items-center">
              <ShieldCheck className="text-primary me-2" size={20} />
              <span>1 Year Warranty</span>
            </div>
          </div>

          <div className="d-flex flex-wrap gap-3 mb-4">
            <div className="quantity-selector">
              <Button variant="outline-secondary" size="sm">-</Button>
              <span className="px-3">1</span>
              <Button variant="outline-secondary" size="sm">+</Button>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="flex-grow-1"
              onClick={() => dispatch(addToCart(product))}
            >
              Add to Cart
            </Button>

            <Button
              variant="outline-primary"
              size="lg"
              className="flex-grow-1"
            >
              Buy Now
            </Button>
          </div>

          <Alert variant="info" className="mt-4">
            <strong>Special Offer:</strong> Get 5% cashback on orders above ₹5000
          </Alert>
        </Col>
      </Row>

      {/* Additional Sections */}
      <Row className="mt-5">
        <Col>
          <div className="border-top pt-4">
            <h4>Product Specifications</h4>
            <table className="table">
              <tbody>
                <tr>
                  <td className="text-muted">Brand</td>
                  <td>{product.brand || 'Generic'}</td>
                </tr>
                <tr>
                  <td className="text-muted">Model</td>
                  <td>{product.model || 'Standard'}</td>
                </tr>
                <tr>
                  <td className="text-muted">Availability</td>
                  <td className="text-success">In Stock ({product.stock || 25} units)</td>
                </tr>
                {product.specifications?.map((spec, index) => (
                  <tr key={index}>
                    <td className="text-muted">{spec.key}</td>
                    <td>{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;