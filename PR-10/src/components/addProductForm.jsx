import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./addProductForm.css"; // Create and style it like Flipkart UI

const AddProduct = () => {

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    desc: "",
    image: "",
  });

  const categories = [
    "Electronics",
    "Books",
    "Fashion",
    "Beauty",
    "Home",
    "Toys",
    "Grocery"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch existing data to generate unique new ID
      const res = await axios.get("http://localhost:5000/products");
      const newId = res.data.length + 1;

      const newProduct = { id: newId.toString(), ...product };

      // POST to JSON Server
      await axios.post("http://localhost:5000/products", newProduct);

      alert("Product added successfully!");

      // Clear form fields
      setProduct({ name: "", price: "", category: "", desc: "", image: "" });

      // Navigate to homepage
      navigate("/");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  return (
    <Container className="add-product-form mt-5">
      <h2 className="mb-4">Add New Product</h2>
      <Form onSubmit={handleSubmit} className="shadow p-4 bg-white rounded">
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="productPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="productCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={product.category}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="productImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={product.image}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="productDesc">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="desc"
            value={product.desc}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <div className="text-end">
          <Button variant="primary" type="submit">
            Add Product
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddProduct;
