// src/pages/ExploreMore.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';

const ExploreMore = () => {
  const { category } = useParams();
  const products = useSelector((state) => state.products);
  const [filtered, setFiltered] = useState([]);
  const [priceRange, setPriceRange] = useState('All');

  useEffect(() => {
    filterByPrice('All');
  }, [category, products]);

  const filterByPrice = (range) => {
    let list = products.filter(
      (p) => p.category?.toLowerCase() === category?.toLowerCase()
    );

    if (range !== 'All') {
      const [min, max] = range.split('-').map(Number);
      list = list.filter((p) => +p.price >= min && +p.price <= max);
    }

    setPriceRange(range);
    setFiltered(list);
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0 text-capitalize">Explore More in {category}</h2>
        <Form.Select
          value={priceRange}
          onChange={(e) => filterByPrice(e.target.value)}
          style={{ width: '200px' }}
        >
          <option value="All">All Prices</option>
          <option value="0-1000">0 - 1000</option>
          <option value="1000-5000">1000 - 5000</option>
          <option value="5000-10000">5000 - 10000</option>
          <option value="10000-999999">10000+</option>
        </Form.Select>
      </div>

      <Row>
        {filtered.length === 0 ? (
          <Col><p>No products found.</p></Col>
        ) : (
          filtered.map((item) => (
            <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="h-100">
                <Link
                  to={`/product/${item.id}`}
                  className="text-decoration-none text-dark"
                >
                  <Card.Img
                    variant="top"
                    src={item.image}
                    style={{ height: '200px', objectFit: 'contain' }}
                  />
                  <Card.Body>
                    <Card.Title className="fs-6 truncate">{item.name}</Card.Title>
                    <Card.Text className="fw-bold text-success">₹{item.price}</Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default ExploreMore;