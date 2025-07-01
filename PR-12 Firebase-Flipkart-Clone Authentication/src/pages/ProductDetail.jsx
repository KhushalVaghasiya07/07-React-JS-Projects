import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductById, clearProductDetail } from '../redux/Actions/productActions';
import { addToCart } from '../redux/Actions/cartActions';
import {
  Container, Row, Col, Button, Badge, Alert, Spinner,
  Image, ListGroup
} from 'react-bootstrap';
import {
  StarFill, StarHalf, Heart, HeartFill,
  Truck, ShieldCheck, ArrowLeft, CheckCircle
} from 'react-bootstrap-icons';
import { getAuth } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading, error } = useSelector(state => state.productDetail);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [mainImage, setMainImage] = useState('');
  const [thumbnailImages, setThumbnailImages] = useState([]);

  useEffect(() => {
    if (id) dispatch(fetchProductById(id));
    return () => dispatch(clearProductDetail());
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setMainImage(product.image || '');
      const images = product.images?.length > 0
        ? product.images
        : Array(4).fill(product.image || '');
      setThumbnailImages(images);
    }
  }, [product]);

  const renderRatingStars = (rating = 0) => {
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

  const handleAddToCart = () => {
    if (!product) return;
    const auth = getAuth();
    const user = auth.currentUser;
    const cartId = user ? user.uid : "guest_cart";

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    };

    dispatch(addToCart(cartItem, cartId));
    toast.success(`${product.name} added to cart 🛒`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleImageClick = (img) => {
    setMainImage(img);
  };

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" role="status" />
        <p className="mt-2">Loading product details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger" className="text-center">
          <Alert.Heading>Error loading product</Alert.Heading>
          <p>{error}</p>
        </Alert>
        <div className="d-flex justify-content-center">
          <Button variant="outline-primary" onClick={() => navigate(-1)}>
            <ArrowLeft className="me-2" /> Back to Products
          </Button>
        </div>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="my-5">
        <Alert variant="warning" className="text-center">
          <Alert.Heading>Product not found</Alert.Heading>
          <p>The requested product could not be loaded.</p>
        </Alert>
        <div className="d-flex justify-content-center">
          <Button variant="outline-primary" onClick={() => navigate(-1)}>
            <ArrowLeft className="me-2" /> Back to Products
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-5 product-detail">
      <ToastContainer />
      <Button variant="outline-secondary" onClick={() => navigate(-1)} className="mb-4">
        <ArrowLeft className="me-1" /> Back to Products
      </Button>

      <Row className="g-4">
        <Col md={6} lg={5}>
          <div className="border rounded-3 p-3 mb-3 text-center bg-light">
            <Image
              src={mainImage || product.image}
              alt={product.name}
              fluid
              style={{ maxHeight: '400px', width: '100%', objectFit: 'contain' }}
            />
          </div>
          <Row className="g-2">
            {thumbnailImages.slice(0, 4).map((img, index) => (
              <Col xs={3} key={index}>
                <div
                  className={`border rounded-3 p-2 text-center thumbnail ${mainImage === img ? 'border-primary' : ''}`}
                  onClick={() => handleImageClick(img)}
                  style={{ cursor: 'pointer' }}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fluid
                    style={{ height: '80px', width: '100%', objectFit: 'contain' }}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </Col>

        <Col md={6} lg={7}>
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h1 className="mb-2">{product.name}</h1>
              <div className="d-flex align-items-center mb-3">
                <div className="me-2">{renderRatingStars(product.rating || 0)}</div>
                <span className="text-muted">
                  ({product.reviews || 0} review{product.reviews !== 1 ? 's' : ''})
                </span>
              </div>
            </div>
            <Button
              variant={isWishlisted ? "danger" : "outline-danger"}
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              {isWishlisted ? <HeartFill /> : <Heart />}
            </Button>
          </div>

          <div className="mb-3">
            <h2 className="text-primary mb-0">₹{product.price?.toLocaleString('en-IN')}</h2>
            {product.originalPrice && (
              <del className="text-muted ms-2 fs-5">₹{product.originalPrice.toLocaleString('en-IN')}</del>
            )}
            {product.discount && (
              <Badge bg="success" className="ms-2 fs-6">{product.discount}% OFF</Badge>
            )}
          </div>

          {product.desc && (
            <div className="mb-4">
              <h5>Description</h5>
              <p className="text-muted">{product.desc}</p>
            </div>
          )}

          {Array.isArray(product.features) && product.features.length > 0 && (
            <div className="mb-4">
              <h5>Features</h5>
              <ListGroup variant="flush">
                {product.features.map((feature, i) => (
                  <ListGroup.Item key={i} className="px-0">
                    <CheckCircle className="text-success me-2" />
                    {feature}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          )}

          <div className="d-flex flex-wrap gap-3 mb-4">
            <div className="d-flex align-items-center text-success">
              <Truck className="me-2" size={20} />
              <span>Free Delivery</span>
            </div>
            <div className="d-flex align-items-center text-primary">
              <ShieldCheck className="me-2" size={20} />
              <span>1 Year Warranty</span>
            </div>
          </div>

          <div className="d-flex gap-3 mb-4">
            <Button
              variant="primary"
              size="lg"
              className="flex-grow-1"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>

          {product.specialOffer && (
            <Alert variant="info" className="mb-4">
              <Alert.Heading>Special Offer</Alert.Heading>
              <p className="mb-0">{product.specialOffer}</p>
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
