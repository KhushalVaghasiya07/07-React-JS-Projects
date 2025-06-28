import React, { useState } from "react";
import {
  Container, Row, Col, Button, Card, Badge,
  Form, Alert, Image, ListGroup, Modal
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  X, Plus, Dash, ShieldCheck, Truck,
  ArrowLeft, Gift, Tag, CheckCircle
} from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../redux/Actions/cartActions";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);


  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const handleQuantityChange = (id, action) => {
    dispatch(updateQuantity(id, action));
  };

  const prepareRemoveItem = (id) => {
    setItemToRemove(id);
    setShowRemoveModal(true);
  };

  const handleRemove = () => {
    if (itemToRemove === "all") {
      dispatch(clearCart());
    } else {
      dispatch(removeFromCart(itemToRemove));
    }
    setShowRemoveModal(false);
  };

  const applyCoupon = () => {
    if (couponCode.trim() === "") return;
    setCouponApplied(true);
  };

  const removeCoupon = () => {
    setCouponApplied(false);
    setCouponCode("");
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) =>
      acc + (Number(item.price) * (item.quantity || 1)), 0);
  };

  const calculateDiscount = () => {
    return couponApplied ? Math.floor(calculateTotal() * 0.1) : 0;
  };

  const calculateFinalTotal = () => {
    return calculateTotal() - calculateDiscount();
  };

  const deliveryCharge = calculateFinalTotal() > 500 ? 0 : 40;

  return (
    <Container className="my-4 cart-page">
      {cartItems.length === 0 ? (
        <div className="text-center py-5 empty-cart">
          <Image
            src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/empty-cart_1f2b3a.png"
            alt="Empty Cart"
            fluid
            style={{ maxWidth: "200px" }}
          />
          <h4 className="my-3">Your cart is empty!</h4>
          <p className="text-muted mb-4">Add items to it now.</p>
          <Button variant="primary" onClick={() => navigate("/")}>
            <ArrowLeft className="me-2" /> Shop Now
          </Button>
        </div>
      ) : (
        <>
          <Row className="mb-3">
            <Col>
              <h2 className="fw-bold">My Cart ({cartItems.length})</h2>
            </Col>
            <Col className="text-end">
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => {
                  setItemToRemove("all");
                  setShowRemoveModal(true);
                }}
              >
                Remove All
              </Button>
            </Col>
          </Row>

          <Row>
            {/* Cart Items */}
            <Col lg={8}>
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
                              <h5 className="mb-1">
                                <Link to={`/product/${item.id}`} className="text-dark">
                                  {item.name}
                                </Link>
                              </h5>
                              <Button
                                variant="link"
                                className="text-danger p-0"
                                onClick={() => prepareRemoveItem(item.id)}
                              >
                                <X size={20} />
                              </Button>
                            </div>
                            <p className="text-muted small mb-2">{item.desc}</p>
                            <div className="d-flex align-items-center mb-2">
                              <Badge bg="success" className="me-2">
                                {item.discount || 10}% OFF
                              </Badge>
                              <span className="text-success small">
                                {item.offer || "Special price"}
                              </span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center quantity-selector">
                                <Button
                                  variant="outline-secondary"
                                  size="sm"
                                  onClick={() => handleQuantityChange(item.id, 'decrease')}
                                  disabled={item.quantity <= 1}
                                >
                                  <Dash />
                                </Button>
                                <span className="px-3">{item.quantity}</span>
                                <Button
                                  variant="outline-secondary"
                                  size="sm"
                                  onClick={() => handleQuantityChange(item.id, 'increase')}
                                >
                                  <Plus />
                                </Button>
                              </div>
                              <h5 className="mb-0 text-primary">
                                ₹{(item.price * item.quantity).toLocaleString()}
                                {item.originalPrice && (
                                  <small className="text-muted ms-2">
                                    <del>₹{item.originalPrice}</del>
                                  </small>
                                )}
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

            {/* Summary */}
            <Col lg={4}>
              <Card className="border-0 shadow-sm sticky-top" style={{ top: "20px" }}>
                <Card.Body>
                  <h5 className="mb-3">Price Details ({cartItems.length} Items)</h5>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Total MRP</span>
                    <span>₹{calculateTotal().toLocaleString()}</span>
                  </div>

                  {couponApplied && (
                    <div className="d-flex justify-content-between mb-2 text-success">
                      <span>Discount</span>
                      <span>-₹{calculateDiscount().toLocaleString()}</span>
                    </div>
                  )}

                  <div className="d-flex justify-content-between mb-2">
                    <span>Delivery Charges</span>
                    <span>
                      {deliveryCharge === 0
                        ? <span className="text-success">FREE</span>
                        : `₹${deliveryCharge}`}
                    </span>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between mb-3 fw-bold">
                    <span>Total Amount</span>
                    <span>₹{(calculateFinalTotal() + deliveryCharge).toLocaleString()}</span>
                  </div>

                  <Button variant="warning" onClick={() => navigate("/checkout")}>
                    PLACE ORDER
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Coupon Section */}
          <Row className="mt-4">
            <Col lg={8}>
              <Card className="shadow-sm">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <Gift className="text-warning me-2" size={20} />
                    <h5 className="mb-0">Coupons & Offers</h5>
                  </div>

                  <Form.Group className="mb-3">
                    <Form.Label className="small text-muted">Apply Coupon</Form.Label>
                    <div className="d-flex">
                      <Form.Control
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        disabled={couponApplied}
                      />
                      {couponApplied ? (
                        <Button variant="outline-danger" className="ms-2" onClick={removeCoupon}>
                          Remove
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          className="ms-2"
                          onClick={applyCoupon}
                          disabled={!couponCode.trim()}
                        >
                          Apply
                        </Button>
                      )}
                    </div>
                  </Form.Group>

                  {couponApplied && (
                    <Alert variant="success" className="d-flex align-items-center py-2">
                      <CheckCircle className="me-2" />
                      10% discount applied with coupon <strong>{couponCode}</strong>
                    </Alert>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}

      {/* Remove Confirmation Modal */}
      <Modal show={showRemoveModal} onHide={() => setShowRemoveModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{itemToRemove === "all" ? "Remove All Items?" : "Remove Item?"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {itemToRemove === "all"
            ? "Are you sure you want to remove all items from your cart?"
            : "This item will be removed from your cart."}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRemoveModal(false)}>
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
