import React, { useEffect, useState } from "react";
import {
  Container, Row, Col, Button, Card,
  Image, Form, Alert, Modal, ListGroup, Badge
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircle, Bag, ArrowLeft, ShieldCheck } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { loadCart, clearCart } from "../redux/Actions/cartActions";
import EmptyCart from "../assets/EmptyCart.webp";
import "./Checkout.css";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems = [], loading } = useSelector((state) => state.cart || {});
  const [cartId, setCartId] = useState(null);
  const [coupon, setCoupon] = useState({ code: "", applied: false });
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCartId(user ? user.uid : "guest_cart");
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (cartId) {
      dispatch(loadCart(cartId));
    }
  }, [cartId, dispatch]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );
  const discount = coupon.applied ? subtotal * 0.1 : 0;
  const delivery = subtotal > 500 ? 0 : 40;
  const total = subtotal - discount + delivery;

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      setShowModal(true);
    } else {
      dispatch(clearCart(cartId));
      alert("Order placed successfully! 🚀");
      navigate("/");
    }
  };

  if (cartItems.length === 0 && !loading) {
    return (
      <Container className="empty-cart-container">
        <Row className="justify-content-center">
          <Col md={8} className="text-center py-5">
            <div className="empty-cart-icon mb-4">
              <Bag size={48} className="text-muted" />
            </div>
            <Image
              src={EmptyCart}
              alt="Empty Cart"
              fluid
              className="empty-cart-image mb-4"
            />
            <h2 className="mb-3">Your Cart Feels Lonely</h2>
            <p className="text-muted mb-4">
              Your shopping cart is empty. Let's find something special for you!
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Button
                variant="outline-primary"
                onClick={() => navigate("/")}
                className="px-4 py-2"
              >
                <ArrowLeft className="me-2" />
                Continue Shopping
              </Button>
              <Button
                variant="primary"
                onClick={() => navigate("/deals")}
                className="px-4 py-2"
              >
                Explore Today's Deals
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="my-4 checkout-page">
      <Button variant="link" className="mb-3 p-0" onClick={() => navigate(-1)}>
        <ArrowLeft size={20} className="me-2" />
        Back
      </Button>

      <Row>
        <Col lg={8} className="mb-4">
          {/* Delivery Address Card */}
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Delivery Address</h5>
                <Button variant="link" className="text-primary p-0">Change</Button>
              </div>
              <div className="border-start border-3 border-primary ps-3">
                <h6>John Doe</h6>
                <p className="mb-1">123 Main Street, Apartment 4B</p>
                <p className="mb-1">Mumbai, Maharashtra 400001</p>
                <p className="mb-0">Phone: +91 9876543210</p>
              </div>
            </Card.Body>
          </Card>

          {/* Order Summary with Product Images */}
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Order Summary ({cartItems.length} Items)</h5>
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
                          className="border rounded"
                        />
                        <Badge
                          pill
                          bg="secondary"
                          className="position-absolute top-0 start-100 translate-middle"
                        >
                          {item.quantity}
                        </Badge>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{item.name}</h6>
                        <small className="text-muted d-block">Size: {item.size || 'M'}</small>
                        <small className="text-muted">Color: {item.color || 'Black'}</small>
                      </div>
                      <div className="text-end">
                        <h6 className="mb-0">₹{(item.price * item.quantity).toLocaleString()}</h6>
                        {item.originalPrice && (
                          <small className="text-muted text-decoration-line-through">
                            ₹{item.originalPrice.toLocaleString()}
                          </small>
                        )}
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>

          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Payment Method</h5>
              <Form>
                <Form.Check
                  type="radio"
                  id="cod"
                  label={
                    <div className="d-flex align-items-center">
                      <Image src="https://react-icons.github.io/react-icons/search/#q=cash" width={24} className="me-2" />
                      <span>Cash on Delivery</span>
                    </div>
                  }
                  name="paymentMethod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="mb-2"
                />
                <Form.Check
                  type="radio"
                  id="card"
                  label={
                    <div className="d-flex align-items-center">
                      <Image src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/credit-card_bb5a98.svg" width={24} className="me-2" />
                      <span>Credit/Debit Card</span>
                    </div>
                  }
                  name="paymentMethod"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className="mb-2"
                />
                <Form.Check
                  type="radio"
                  id="upi"
                  label={
                    <div className="d-flex align-items-center">
                      <Image src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/upi-icon_3a6b09.svg" width={24} className="me-2" />
                      <span>UPI</span>
                    </div>
                  }
                  name="paymentMethod"
                  checked={paymentMethod === "upi"}
                  onChange={() => setPaymentMethod("upi")}
                />
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm sticky-top" style={{ top: "20px" }}>
            <Card.Body>
              <h5 className="mb-3">Price Details</h5>

              <div className="d-flex justify-content-between mb-2">
                <span>Total MRP</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>

              {coupon.applied && (
                <div className="d-flex justify-content-between mb-2 text-success">
                  <span>Discount</span>
                  <span>-₹{discount.toLocaleString()}</span>
                </div>
              )}

              <div className="d-flex justify-content-between mb-2">
                <span>Delivery Charges</span>
                <span>{delivery === 0 ? (
                  <span className="text-success">FREE</span>
                ) : (
                  `₹${delivery}`
                )}</span>
              </div>

              <hr />
              <div className="d-flex justify-content-between mb-3 fw-bold fs-5">
                <span>Total Amount</span>
                <span>₹{total.toLocaleString()}</span>
              </div>

              <Form.Group className="mb-3">
                <Form.Label className="small text-muted">Have a coupon?</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    type="text"
                    placeholder="Enter coupon code"
                    value={coupon.code}
                    onChange={(e) => setCoupon({ ...coupon, code: e.target.value })}
                    disabled={coupon.applied}
                    className="border-end-0"
                  />
                  {coupon.applied ? (
                    <Button
                      variant="outline-danger"
                      className="border-start-0"
                      onClick={() => setCoupon({ code: "", applied: false })}
                    >
                      Remove
                    </Button>
                  ) : (
                    <Button
                      variant="outline-primary"
                      className="border-start-0"
                      onClick={() => setCoupon({ ...coupon, applied: true })}
                      disabled={!coupon.code.trim()}
                    >
                      Apply
                    </Button>
                  )}
                </div>
              </Form.Group>

              {coupon.applied && (
                <Alert variant="success" className="d-flex align-items-center py-2 small mb-3">
                  <CheckCircle className="me-2" />
                  10% discount applied with coupon <strong>{coupon.code}</strong>
                </Alert>
              )}

              <Button
                variant="warning"
                className="w-100 py-2 fw-bold"
                onClick={handlePlaceOrder}
                disabled={loading}
              >
                {loading ? "Processing..." : `PAY ₹${total.toLocaleString()}`}
              </Button>

              <div className="d-flex align-items-center justify-content-center mt-3 text-muted small">
                <ShieldCheck className="me-2" />
                <span>Safe and Secure Payments</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Empty Cart Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body className="text-center py-5">
          <Image
            src={EmptyCart}
            fluid
            style={{ maxWidth: "200px" }}
            alt="Empty Cart"
            className="mb-4"
          />
          <h4 className="mb-3">Your cart is empty!</h4>
          <p className="text-muted mb-4">Add something to checkout</p>
          <Button variant="primary" onClick={() => {
            setShowModal(false);
            navigate("/");
          }}>
            Continue Shopping
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Checkout;