// src/pages/OrdersPage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Card, Spinner, Alert, Image, Badge, Table } from "react-bootstrap";
import { fetchUserOrders } from "../redux/Actions/orderActions";
import { BsBoxSeam, BsCheckCircle } from "react-icons/bs";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth || {});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // In OrdersPage.jsx
  useEffect(() => {
    const guestId = localStorage.getItem('guestId');
    if (guestId) {
      const loadOrders = async () => {
        try {
          setLoading(true);
          const guestOrders = await dispatch(fetchGuestOrders(guestId));
          setOrders(guestOrders);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      loadOrders();
    }
  }, [dispatch]);

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
      <h2 className="mb-4">My Orders</h2>
      {orders.map((order) => (
        <Card key={order.id} className="mb-4 shadow-sm">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <div>
              <strong>Order ID:</strong> {order.id}
            </div>
            <Badge bg={order.status === "processing" ? "warning" : "success"}>
              {order.status}
            </Badge>
          </Card.Header>
          <Card.Body>
            <Table responsive>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={`${order.id}-${item.productId}`}>
                    <td>
                      <div className="d-flex align-items-center">
                        <Image
                          src={item.image || "https://via.placeholder.com/50"}
                          width={50}
                          height={50}
                          className="me-3"
                        />
                        {item.name}
                      </div>
                    </td>
                    <td>₹{item.price.toLocaleString()}</td>
                    <td>{item.quantity}</td>
                    <td>₹{(item.price * item.quantity).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
          <Card.Footer className="text-end">
            <h5>
              Order Total: ₹{order.total.toLocaleString()}
            </h5>
            <small className="text-muted">
              Ordered on: {new Date(order.createdAt?.toDate()).toLocaleString()}
            </small>
          </Card.Footer>
        </Card>
      ))}
    </Container>
  );
};

export default OrdersPage;