import React, { useState, useEffect } from "react";
import {
  Container, Row, Col, Button, Card,
  Form, Image, Modal
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle, CreditCard, ArrowLeft, HouseFill
} from "react-bootstrap-icons";

const CheckoutPage = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "credit"
  });
  const navigate = useNavigate();

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("currentOrder")) || [];
    setOrderDetails(details);
  }, []);

  const handlePlaceOrder = () => {
    // Save order to history
    const orderHistory = JSON.parse(localStorage.getItem("orderHistory") || "[]");
    const order = {
      ...orderDetails,
      ...formData,
      orderId: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      status: "completed"
    };

    localStorage.setItem("orderHistory", JSON.stringify([...orderHistory, order]));
    localStorage.removeItem("cart");
    localStorage.removeItem("currentOrder");

    // Show success modal
    setShowSuccessModal(true);
  };

  if (!orderDetails || orderDetails.items?.length === 0) {
    return (
      <Container className="my-5 text-center">
        <h4>Your cart is empty!</h4>
        <Button variant="primary" onClick={() => navigate("/")}>
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      {/* Success Modal */}
      <Modal
        show={showSuccessModal}
        onHide={() => navigate("/")}
        centered
        backdrop="static"
        size="lg"
      >
        <Modal.Body className="text-center p-5">
          <CheckCircle className="text-success mb-3" style={{ fontSize: "4rem" }} />
          <h3>Order Placed Successfully!</h3>
          <p className="text-muted mb-4">
            Thank you for your purchase. Your order ID is #{orderDetails?.orderId || `ORD-${Date.now()}`}
          </p>
          <Button
            variant="primary"
            className="px-4 py-2"
            onClick={() => navigate("/")}
          >
            <HouseFill className="me-2" />
            Continue Shopping
          </Button>
        </Modal.Body>
      </Modal>

      <Button
        variant="link"
        onClick={() => navigate("/cart")}
        className="mb-3 px-0"
      >
        <ArrowLeft className="me-2" /> Back to Cart
      </Button>

      <Row>
        <Col lg={8} className="pe-lg-4">
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <h4 className="mb-4">Delivery Address</h4>
              <Form>
                {/* Your form fields here */}
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="border-0 shadow-sm sticky-top" style={{ top: "20px" }}>
            <Card.Body>
              <h5 className="mb-3">Order Summary</h5>

              {/* Order items list */}

              <Button
                variant="warning"
                className="w-100 fw-bold py-2 mt-3"
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;