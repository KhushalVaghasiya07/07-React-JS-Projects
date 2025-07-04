import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Card,
  Spinner,
  Alert,
  Image,
  Badge,
  Row,
  Col,
} from "react-bootstrap";
import { fetchUserOrders, fetchGuestOrders } from "../../redux/Actions/orderActions";
import { BsBoxSeam } from "react-icons/bs";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer || {});

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      try {
        let fetchedOrders = [];

        if (user?.uid) {
          fetchedOrders = await fetchUserOrders(user.uid)(dispatch);
        } else {
          const guestId = localStorage.getItem("guestId");
          if (guestId) {
            fetchedOrders = await fetchGuestOrders(guestId)(dispatch);
          }
        }

        setOrders(fetchedOrders);
      } catch (err) {
        setError(err.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [dispatch, user]);

  if (loading) {
    return (
      <Container className="text-center my-5 py-5">
        <Spinner animation="border" variant="primary" />
        <div className="mt-3">Loading your orders...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (orders.length === 0) {
    return (
      <Container className="text-center my-5 py-5">
        <BsBoxSeam size={48} className="text-muted mb-3" />
        <h3>No Orders Found</h3>
        <p className="text-muted">You haven't placed any orders yet</p>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <h2 className="mb-4 fw-semibold">My Orders</h2>
      {orders.map((order) => (
        <Card key={order.id} className="mb-5 shadow-sm border-0 rounded-4 order-card">
          <Card.Header className="d-flex justify-content-between align-items-center bg-white border-bottom px-4 py-3">
            <span className="fw-bold text-dark">
              Order ID: <span className="text-primary">{order.id}</span>
            </span>
            <Badge
              bg={
                order.status === "processing"
                  ? "warning"
                  : order.status === "delivered"
                    ? "success"
                    : "info"
              }
              className="text-uppercase px-3 py-2 rounded-pill fw-semibold"
            >
              {order.status}
            </Badge>
          </Card.Header>

          <Card.Body className="p-4">
            {order.items.map((item, idx) => (
              <Row
                key={idx}
                className="align-items-center py-3 border-bottom order-item-row"
              >
                <Col xs={12} md={2} className="text-center mb-3 mb-md-0">
                  <Image
                    src={item.image || "https://via.placeholder.com/120"}
                    alt={item.name}
                    fluid
                    className="rounded shadow-sm"
                    style={{ maxHeight: "130px", objectFit: "contain" }}
                  />
                </Col>
                <Col xs={12} md={5}>
                  <h5 className="fw-semibold mb-1 text-dark">{item.name}</h5>
                  <p className="text-muted mb-1">Qty: {item.quantity}</p>
                </Col>
                <Col xs={6} md={2} className="text-start text-md-end">
                  <p className="mb-0 fw-medium text-secondary">Price</p>
                  ₹{item.price.toLocaleString()}
                </Col>
                <Col xs={6} md={3} className="text-end">
                  <p className="mb-0 fw-medium text-secondary">Total</p>
                  ₹{(item.price * item.quantity).toLocaleString()}
                </Col>
              </Row>
            ))}
          </Card.Body>

          <Card.Footer className="bg-light d-flex justify-content-between flex-column flex-md-row gap-2 align-items-start align-items-md-center px-4 py-3">
            <h5 className="mb-0 text-dark">
              Total Paid: ₹{order.total.toLocaleString()}
            </h5>
            <small className="text-muted">
              Ordered on:{" "}
              {order.createdAt?.toDate
                ? new Date(order.createdAt.toDate()).toLocaleString()
                : new Date(order.createdAt).toLocaleString()}
            </small>
          </Card.Footer>
        </Card>
      ))}

      {/* Custom Style Enhancements */}
      <style jsx="true">{`
        .order-card:hover {
          box-shadow: 0 0 0 3px #e2f0ff;
        }

        .order-item-row:hover {
          background-color: #f8f9fa;
          transition: background-color 0.2s ease-in-out;
        }

        .card-header span {
          font-size: 1.1rem;
        }

        .badge {
          font-size: 0.75rem;
        }
      `}</style>
    </Container>
  );
};

export default OrdersPage;
