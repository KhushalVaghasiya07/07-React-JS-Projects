// src/pages/OrdersPage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Image,
  Badge,
  Table,
} from "react-bootstrap";
import { fetchUserOrders, fetchGuestOrders } from "../../redux/Actions/orderActions"
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
          const result = await dispatch(fetchUserOrders(user.uid));

          fetchedOrders = result.payload || [];
        } else {
          const guestId = localStorage.getItem("guestId");
          if (guestId) {
            const result = await dispatch(fetchGuestOrders(guestId));
            fetchedOrders = result.payload || [];
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
            <h5>Order Total: ₹{order.total.toLocaleString()}</h5>
            <small className="text-muted">
              Ordered on:{" "}
              {order.createdAt?.toDate
                ? new Date(order.createdAt.toDate()).toLocaleString()
                : new Date(order.createdAt).toLocaleString()}
            </small>
          </Card.Footer>
        </Card>
      ))}
    </Container>
  );
};

export default OrdersPage;
