import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Card, ListGroup, Spinner, Alert, Image, Badge, Form } from "react-bootstrap";
import { clearCart, loadCart } from "../redux/Actions/cartActions";
import { CheckCircleFill, ArrowLeft, ShieldCheck, GeoAlt, CreditCard, Cash } from "react-bootstrap-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createOrder } from "../redux/Actions/orderActions";


const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.authReducer.user);
  const cartId = user?.uid || "guest_cart";

  const { cartItems = [], loading, error } = useSelector((state) => state.cart);

  const [orderSuccess, setOrderSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  useEffect(() => {
    if (cartId) {
      dispatch(loadCart(cartId));
    }
  }, [dispatch, cartId]);


  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal > 500 ? 0 : 40;
  const total = subtotal + delivery;

  const handlePlaceOrder = async () => {
    try {
      const userId = user?.uid || null;
      const guestId = !user?.uid ? localStorage.getItem("guestId") : null;

      await dispatch(createOrder(cartItems, total, guestId, user?.uid));


      await dispatch(clearCart(cartId));

      setOrderSuccess(true);
      toast.success("Order placed successfully!");
      setTimeout(() => navigate("/"), 4000);
    } catch (error) {
      toast.error("Failed to place order. Try again later.");
    }
  };



  if (loading) {
    return (
      <Container className="text-center my-5 py-5">
        <Spinner animation="border" variant="primary" />
        <div className="mt-3">Loading your cart details...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger" className="d-flex align-items-center">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </Alert>
        <Button variant="outline-primary" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </Container>
    );
  }

  if (orderSuccess) {
    return (
      <Container className="text-center my-5 py-5">
        <div className="success-animation mb-4">
          <CheckCircleFill size={80} color="#28a745" />
        </div>
        <h2 className="mb-3">Order Placed Successfully!</h2>
        <p className="text-muted mb-4">
          Your order has been confirmed. You'll receive a confirmation shortly.
        </p>
        <div className="progress" style={{ height: "4px", maxWidth: "300px", margin: "0 auto" }}>
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: "100%" }}
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <p className="mt-3">Redirecting to home page...</p>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </Container>
    );
  }

  return (
    <Container className="my-4 checkout-container">
      <ToastContainer position="bottom-right" autoClose={3000} />

      <Button variant="link" className="mb-3 p-0 back-button" onClick={() => navigate(-1)}>
        <ArrowLeft size={20} className="me-2" />
        Back
      </Button>

      <Row>
        <Col md={8}>
          <Card className="mb-3 shadow-sm address-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">
                  <GeoAlt className="me-2 text-primary" />
                  Delivery Address
                </h5>
                <Button variant="link" className="text-primary p-0">
                  Change
                </Button>
              </div>
              <div className="border-start border-3 border-primary ps-3 py-1">
                <h6 className="mb-2">John Doe</h6>
                <p className="mb-1">123 Main Street, Apartment 4B</p>
                <p className="mb-1">Mumbai, Maharashtra 400001</p>
                <p className="mb-0">Phone: +91 9876543210</p>
              </div>
            </Card.Body>
          </Card>

          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Payment Method</h5>
              <Form>
                <div className={`payment-option ${paymentMethod === "cod" ? "active" : ""}`}>
                  <div className="payment-icon">
                    <Cash size={24} />
                  </div>
                  <div className="payment-details">
                    <h6>Cash on Delivery</h6>
                    <p className="text-muted mb-0">Pay when you receive your order</p>
                  </div>
                  <Form.Check
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="ms-auto"
                  />
                </div>

                <div className={`payment-option ${paymentMethod === "card" ? "active" : ""}`}>
                  <div className="payment-icon">
                    <CreditCard size={24} />
                  </div>
                  <div className="payment-details">
                    <h6>Credit/Debit Card</h6>
                    <p className="text-muted mb-0">Pay securely with your card</p>
                  </div>
                  <Form.Check
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="ms-auto"
                  />
                </div>
              </Form>
            </Card.Body>
          </Card>

          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <h3 className="mb-4">Order Summary ({cartItems.length} Items)</h3>
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.id} className="px-0 py-3">
                    <div className="d-flex align-items-center">
                      <div className="position-relative me-3">
                        <Image
                          src={item.image || "https://via.placeholder.com/80"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="border rounded product-image"
                        />
                        <Badge
                          pill
                          bg="secondary"
                          className="position-absolute top-0 start-100 translate-middle quantity-badge"
                        >
                          {item.quantity}
                        </Badge>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="mb-1">{item.name}</h5>
                        <small className="text-muted">Qty: {item.quantity}</small>
                      </div>
                      <div className="text-end">
                        <h5 className="mb-0">₹{(item.price * item.quantity).toLocaleString()}</h5>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm price-summary-card sticky-top">
            <Card.Body>
              <h5 className="mb-3">Price Details</h5>

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Delivery Charges</span>
                <span>{delivery === 0 ? (
                  <span className="text-success">FREE</span>
                ) : (
                  `₹${delivery}`
                )}</span>
              </div>

              <hr className="divider" />

              <div className="d-flex justify-content-between mb-3 fw-bold fs-5">
                <span>Total Amount</span>
                <span>₹{total.toLocaleString()}</span>
              </div>

              <Button
                variant="warning"
                className="w-100 py-2 checkout-button"
                onClick={handlePlaceOrder}
              >
                PLACE ORDER
              </Button>

              <div className="d-flex align-items-center justify-content-center mt-3 text-muted small security-badge">
                <ShieldCheck className="me-2 text-success" />
                <span>Safe and Secure Payments</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <style jsx>{`
        .checkout-container {
          max-width: 1200px;
        }
        .back-button {
          color: #2874f0;
          font-weight: 500;
        }
        .address-card {
          border-left: 3px solid #2874f0;
        }
        .payment-option {
          display: flex;
          align-items: center;
          padding: 12px;
          border-radius: 4px;
          margin-bottom: 12px;
          cursor: pointer;
          border: 1px solid #e0e0e0;
        }
        .payment-option.active {
          border-color: #2874f0;
          background-color: #f0f8ff;
        }
        .payment-icon {
          margin-right: 16px;
          color: #2874f0;
        }
        .payment-details {
          flex-grow: 1;
        }
        .product-image {
          object-fit: contain;
        }
        .quantity-badge {
          font-size: 12px;
          padding: 4px 8px;
        }
        .price-summary-card {
          top: 20px;
          border-radius: 4px;
        }
        .divider {
          border-top: 1px dashed #e0e0e0;
          margin: 16px 0;
        }
        .checkout-button {
          background-color: #fb641b;
          border: none;
          font-weight: 500;
          color: white;
        }
        .checkout-button:hover {
          background-color: #e55a17;
          color: white;
        }
        .security-badge {
          color: #878787;
        }
        .success-animation {
          animation: bounce 0.5s;
        }
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </Container>
  );
};

export default CheckoutPage;