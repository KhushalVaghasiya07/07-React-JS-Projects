import React from "react";
import {
  Container, Row, Col, Card, Button, Badge,
  ListGroup, Alert, Image, Form
} from "react-bootstrap";
import {
  ArrowLeft, ShieldCheck, Truck, CheckCircle,
  CreditCard, MapPin, Clock, Gift
} from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [deliveryAddress, setDeliveryAddress] = useState("Home - 123 Main St, Apt 4B, New York, NY 10001");

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) =>
      acc + (Number(item.price) * (item.quantity || 1)), 0);
  };

  const deliveryCharge = calculateTotal() > 500 ? 0 : 40;

  return (
    <Container className="my-4 checkout-page">
      <Row className="mb-4">
        <Col>
          <Button variant="outline-primary" onClick={() => navigate(-1)}>
            <ArrowLeft className="me-2" /> Back to Cart
          </Button>
          <h2 className="mt-3 fw-bold">Confirm Your Order</h2>
          <p className="text-muted">Review your items and delivery details before placing your order</p>
        </Col>
      </Row>

      <Row>
        {/* Order Summary */}
        <Col lg={8}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <h5 className="mb-0 flex-grow-1">Order Summary</h5>
                <Badge bg="light" text="dark" className="fs-6">
                  {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
                </Badge>
              </div>

              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.id} className="px-0 py-3">
                    <div className="d-flex">
                      <div className="me-3" style={{ width: "80px" }}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fluid
                          className="border p-1"
                        />
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{item.name}</h6>
                        <p className="text-muted small mb-1">{item.desc}</p>
                        <div className="d-flex justify-content-between">
                          <span className="text-primary fw-bold">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                          <span className="text-muted small">
                            Qty: {item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>

          {/* Delivery Address */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <MapPin className="text-primary me-2" size={20} />
                <h5 className="mb-0">Delivery Address</h5>
              </div>

              <Form.Select
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
              >
                <option value="Home - 123 Main St, Apt 4B, New York, NY 10001">
                  Home - 123 Main St, Apt 4B, New York, NY 10001
                </option>
                <option value="Office - 456 Business Ave, Floor 3, New York, NY 10005">
                  Office - 456 Business Ave, Floor 3, New York, NY 10005
                </option>
              </Form.Select>

              <Button variant="outline-primary" size="sm" className="mt-3">
                + Add New Address
              </Button>
            </Card.Body>
          </Card>

          {/* Payment Method */}
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <CreditCard className="text-primary me-2" size={20} />
                <h5 className="mb-0">Payment Method</h5>
              </div>

              <Form>
                <Form.Check
                  type="radio"
                  id="creditCard"
                  label={
                    <div className="d-flex align-items-center">
                      <span>Credit/Debit Card</span>
                      <Badge bg="warning" text="dark" className="ms-2">Recommended</Badge>
                    </div>
                  }
                  name="paymentMethod"
                  checked={paymentMethod === "creditCard"}
                  onChange={() => setPaymentMethod("creditCard")}
                  className="mb-2"
                />

                <Form.Check
                  type="radio"
                  id="upi"
                  label="UPI Payment"
                  name="paymentMethod"
                  checked={paymentMethod === "upi"}
                  onChange={() => setPaymentMethod("upi")}
                  className="mb-2"
                />

                <Form.Check
                  type="radio"
                  id="cod"
                  label="Cash on Delivery"
                  name="paymentMethod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Order Total */}
        <Col lg={4}>
          <Card className="border-0 shadow-sm sticky-top" style={{ top: "20px" }}>
            <Card.Body>
              <h5 className="mb-3">Order Total</h5>

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>₹{calculateTotal().toLocaleString()}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Delivery Fee</span>
                <span>
                  {deliveryCharge === 0 ? (
                    <span className="text-success">FREE</span>
                  ) : (
                    `₹${deliveryCharge}`
                  )}
                </span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-3 fw-bold fs-5">
                <span>Total Payable</span>
                <span>₹{(calculateTotal() + deliveryCharge).toLocaleString()}</span>
              </div>

              <Button variant="success" className="w-100 mb-3" onClick={() => navigate("/order-confirmed")}>
                CONFIRM & PAY
              </Button>

              <Alert variant="light" className="small">
                <div className="d-flex mb-2">
                  <ShieldCheck className="text-success me-2" />
                  <span>Safe and Secure Payments</span>
                </div>
                <div className="d-flex mb-2">
                  <Truck className="text-success me-2" />
                  <span>Delivery within 3-5 business days</span>
                </div>
                <div className="d-flex">
                  <CheckCircle className="text-success me-2" />
                  <span>Easy returns within 15 days</span>
                </div>
              </Alert>
            </Card.Body>
          </Card>

          {/* Continue Shopping Card */}
          <Card className="border-0 shadow-sm mt-4">
            <Card.Body className="text-center">
              <Gift className="text-warning mb-3" size={40} />
              <h5>More Shopping to do?</h5>
              <p className="text-muted small mb-3">
                Continue shopping for more great deals and offers
              </p>
              <Button
                variant="outline-primary"
                className="w-100"
                onClick={() => navigate("/")}
              >
                CONTINUE SHOPPING
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;