import React, { useEffect, useState } from "react";
import {
  Container, Row, Col, Button, Card, Badge,
  Form, Alert, Image, ListGroup, Modal
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  X, Plus, Dash, ShieldCheck, Truck, CreditCard,
  ArrowLeft, Gift, Tag, CheckCircle
} from "react-bootstrap-icons";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const updateCart = (updatedItems) => {
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const handleQuantityChange = (id, action) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = action === 'increase'
          ? (item.quantity || 1) + 1
          : Math.max(1, (item.quantity || 1) - 1);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    updateCart(updatedCart);
  };

  const prepareRemoveItem = (id) => {
    setItemToRemove(id);
    setShowRemoveModal(true);
  };

  const handleRemove = () => {
    const updatedCart = cartItems.filter(item => item.id !== itemToRemove);
    updateCart(updatedCart);
    setShowRemoveModal(false);
  };

  const applyCoupon = () => {
    if (couponCode.trim() === "") return;
    setCouponApplied(true);
    // Here you would typically validate the coupon with your backend
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
    return couponApplied ? Math.floor(calculateTotal() * 0.1) : 0; // 10% discount for demo
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
          <Button
            variant="primary"
            onClick={() => navigate("/")}
            className="px-4"
          >
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
            {/* Cart Items Column */}
            <Col lg={8} className="pe-lg-4">
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

                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center quantity-selector">
                                <Button
                                  variant="outline-secondary"
                                  size="sm"
                                  onClick={() => handleQuantityChange(item.id, 'decrease')}
                                  disabled={(item.quantity || 1) <= 1}
                                >
                                  <Dash />
                                </Button>
                                <span className="px-3">{item.quantity || 1}</span>
                                <Button
                                  variant="outline-secondary"
                                  size="sm"
                                  onClick={() => handleQuantityChange(item.id, 'increase')}
                                >
                                  <Plus />
                                </Button>
                              </div>

                              <h5 className="mb-0 text-primary">
                                ₹{(item.price * (item.quantity || 1)).toLocaleString()}
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

              <Card className="border-0 shadow-sm">
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
                        <Button
                          variant="outline-danger"
                          className="ms-2"
                          onClick={removeCoupon}
                        >
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
                      10% discount applied with coupon {couponCode}
                    </Alert>
                  )}

                  <div className="offer-card p-3 bg-light rounded">
                    <div className="d-flex align-items-center mb-2">
                      <Tag className="text-success me-2" />
                      <strong>Available Offers</strong>
                    </div>
                    <ul className="small ps-3 mb-0">
                      <li>10% off on orders above ₹1000</li>
                      <li>Free delivery on orders above ₹500</li>
                      <li>Extra 5% off with SBI credit cards</li>
                    </ul>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Price Summary Column */}
            <Col lg={4} className="mt-4 mt-lg-0">
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
                      {deliveryCharge === 0 ? (
                        <span className="text-success">FREE</span>
                      ) : (
                        `₹${deliveryCharge}`
                      )}
                    </span>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between mb-3 fw-bold">
                    <span>Total Amount</span>
                    <span>₹{(calculateFinalTotal() + deliveryCharge).toLocaleString()}</span>
                  </div>

                  <Button
                    variant="warning"
                    onClick={() => navigate("/checkout")}
                  >
                    PLACE ORDER
                  </Button>

                  <div className="d-flex align-items-center text-success small mb-2">
                    <ShieldCheck className="me-2" />
                    <span>Safe and Secure Payments</span>
                  </div>

                  <div className="d-flex align-items-center text-muted small">
                    <Truck className="me-2" />
                    <span>Easy returns & 10 days replacements</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}

      {/* Remove Item Confirmation Modal */}
      <Modal show={showRemoveModal} onHide={() => setShowRemoveModal(false)} centered>
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