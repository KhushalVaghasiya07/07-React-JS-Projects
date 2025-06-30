// src/pages/Checkout.jsx
import React, { useEffect, useState } from "react";
import {
  Container, Row, Col, Button, Card,
  Image, Form, Alert, Modal
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { loadCart, clearCart } from "../redux/Actions/cartActions";
import EmptyCart from "../assets/EmptyCart.webp"

const Checkout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems = [], loading } = useSelector((state) => state.cart || {});
  const [cartId, setCartId] = useState(null);
  const [coupon, setCoupon] = useState({ code: "", applied: false });
  const [showModal, setShowModal] = useState(false);

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
      dispatch(clearCart(cartId)); // Optionally clear cart on order placed
      alert("Order placed successfully! 🚀");
      navigate("/");
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h3 className="mb-4 text-center">Checkout</h3>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Price Details ({cartItems.length} Items)</h5>
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
                <span>{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
              </div>

              <hr />
              <div className="d-flex justify-content-between mb-3 fw-bold">
                <span>Total Amount</span>
                <span>₹{total.toLocaleString()}</span>
              </div>

              <Form.Group className="mb-3">
                <Form.Label className="small text-muted">Apply Coupon</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    type="text"
                    placeholder="Enter coupon code"
                    value={coupon.code}
                    onChange={(e) => setCoupon({ ...coupon, code: e.target.value })}
                    disabled={coupon.applied}
                  />
                  {coupon.applied ? (
                    <Button
                      variant="outline-danger"
                      className="ms-2"
                      onClick={() => setCoupon({ code: "", applied: false })}
                    >
                      Remove
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      className="ms-2"
                      onClick={() => setCoupon({ ...coupon, applied: true })}
                      disabled={!coupon.code.trim()}
                    >
                      Apply
                    </Button>
                  )}
                </div>
              </Form.Group>

              {coupon.applied && (
                <Alert variant="success" className="d-flex align-items-center py-2">
                  <CheckCircle className="me-2" />
                  10% discount applied with coupon <strong>{coupon.code}</strong>
                </Alert>
              )}

              <Button variant="warning" className="w-100 mt-3" onClick={handlePlaceOrder}>
                PLACE ORDER
              </Button>
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
            style={{ maxWidth: "150px" }}
            alt="Empty Cart"
            className="mb-3"
          />
          <h5>Your cart is empty!</h5>
          <p className="text-muted">Add something to checkout</p>
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
