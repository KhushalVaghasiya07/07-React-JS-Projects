import React, { useState, useEffect } from "react";
import {
  Container, Row, Col, Button, Card,
  Alert, Image, ListGroup, Modal, Spinner, Toast, Form
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { X, Plus, Dash, CheckCircle } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCart,
  removeFromCart,
  updateQuantity,
  clearCart
} from "../redux/Actions/cartActions";
import EmptyCart from "../assets/EmptyCart.png";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Fetch current user from Redux
  const user = useSelector((state) => state.authReducer.user);
  const cartId = user?.uid || "guest_cart";

  const { cartItems = [], loading, error } = useSelector((state) => state.cart || {});
  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [coupon, setCoupon] = useState({ code: "", applied: false });
  const [toast, setToast] = useState({ show: false, message: "" });

  // ✅ Load cart when user changes or cartId updates
  useEffect(() => {
    if (cartId) {
      dispatch(loadCart(cartId));
    }
  }, [dispatch, cartId]);

  const showMessage = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const handleQuantity = async (id, action) => {
    try {
      await dispatch(updateQuantity(id, action, cartId));
      showMessage("Cart updated");
    } catch {
      showMessage("Failed to update quantity");
    }
  };

  const handleRemove = async () => {
    try {
      if (itemToRemove === "all") {
        await dispatch(clearCart(cartId));
        showMessage("Cart cleared");
      } else {
        await dispatch(removeFromCart(itemToRemove, cartId));
        showMessage("Item removed");
      }
    } catch {
      showMessage("Failed to remove item");
    }
    setShowModal(false);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  const discount = coupon.applied ? subtotal * 0.1 : 0;
  const delivery = subtotal > 500 ? 0 : 40;
  const total = subtotal - discount + delivery;

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading cart...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">
          {error}
          <div className="mt-3">
            <Button variant="primary" onClick={() => dispatch(loadCart(cartId))}>
              Try Again
            </Button>
            <Button
              variant="outline-secondary"
              className="ms-2"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Toast
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        className="position-fixed bottom-0 end-0 m-3"
        delay={3000}
        autohide
      >
        <Toast.Body>{toast.message}</Toast.Body>
      </Toast>

      {cartItems.length === 0 ? (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "60vh", background: "#fff" }}
        >
          <div className="text-center p-4">
            <img
              src={EmptyCart}
              alt="Empty Cart"
              style={{ width: "200px", marginBottom: "20px" }}
            />
            <h4 className="fw-semibold mb-2">Your cart is empty!</h4>
            <p className="text-muted mb-4">Add items to it now.</p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/")}
            >
              Shop now
            </Button>
          </div>
        </div>
      ) : (
        <>
          <Row className="mb-3 align-items-center">
            <Col>
              <h2 className="fw-bold">My Cart ({cartItems.length})</h2>
            </Col>
            <Col className="text-end">
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => {
                  setItemToRemove("all");
                  setShowModal(true);
                }}
              >
                Clear Cart
              </Button>
            </Col>
          </Row>

          <Row>
            <Col md={8}>
              <Card className="border-0 shadow-sm mb-3">
                <Card.Body className="p-0">
                  <ListGroup variant="flush">
                    {cartItems.map((item) => (
                      <ListGroup.Item key={item.id} className="p-3">
                        <div className="d-flex">
                          <div className="me-3" style={{ width: "100px" }}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              className="border p-2"
                            />
                          </div>
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between">
                              <h5 className="mb-1">{item.name}</h5>
                              <Button
                                variant="link"
                                className="text-danger p-0"
                                onClick={() => {
                                  setItemToRemove(item.id);
                                  setShowModal(true);
                                }}
                              >
                                <X size={20} />
                              </Button>
                            </div>
                            <p className="text-muted small mb-2">{item.description}</p>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center quantity-selector">
                                <Button
                                  variant="outline-secondary"
                                  size="sm"
                                  onClick={() => handleQuantity(item.id, "decrease")}
                                  disabled={item.quantity <= 1}
                                >
                                  <Dash />
                                </Button>
                                <span className="px-3">{item.quantity}</span>
                                <Button
                                  variant="outline-secondary"
                                  size="sm"
                                  onClick={() => handleQuantity(item.id, "increase")}
                                >
                                  <Plus />
                                </Button>
                              </div>
                              <h5 className="mb-0 text-primary">
                                ₹{(item.price * item.quantity).toLocaleString()}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="border-0 shadow-sm sticky-top" style={{ top: "20px" }}>
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

                  <Button
                    variant="success"
                    className="w-100 mt-3"
                    onClick={() => navigate("/checkout")}
                  >
                    Proceed to Checkout
                  </Button>
                </Card.Body>
              </Card>

              <Card className="mt-3 shadow-sm">
                <Card.Body>
                  <h5 className="mb-3">Coupons & Offers</h5>
                  <Form.Group className="mb-3">
                    <Form.Label className="small text-muted">Apply Coupon</Form.Label>
                    <div className="d-flex">
                      <Form.Control
                        type="text"
                        placeholder="Enter coupon code"
                        value={coupon.code}
                        onChange={(e) =>
                          setCoupon({ ...coupon, code: e.target.value })
                        }
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
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {itemToRemove === "all" ? "Remove All Items?" : "Remove Item?"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {itemToRemove === "all"
            ? "Are you sure you want to remove all items from your cart?"
            : "This item will be removed from your cart."}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleRemove}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CartPage;
