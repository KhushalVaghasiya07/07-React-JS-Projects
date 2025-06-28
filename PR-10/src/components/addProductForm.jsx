import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./addProductForm.css";

// Custom 6-digit ID generator
const generateShortId = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const AddProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

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
    "Grocery",
  ];

  // Load product data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      axios
        .get(`http://localhost:5000/products/${id}`)
        .then((res) => setProduct(res.data))
        .catch((err) => {
          console.error("Error fetching product:", err);
          alert("Failed to load product data");
          navigate("/");
        });
    }
  }, [id, isEditMode, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await axios.put(`http://localhost:5000/products/${id}`, product);
        alert("Product updated successfully!");
      } else {
        // Generate unique 6-digit ID
        let newId;
        const res = await axios.get("http://localhost:5000/products");
        let isUnique = false;
        while (!isUnique) {
          newId = generateShortId();
          isUnique = !res.data.find((item) => item.id === newId);
        }

        const newProduct = { id: newId, ...product };
        await axios.post("http://localhost:5000/products", newProduct);
        alert("Product added successfully!");
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product.");
    }
  };

  return (
    <Container className="add-product-form mt-5">
      <h2 className="mb-4">{isEditMode ? "Edit Product" : "Add New Product"}</h2>
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
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
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
            {isEditMode ? "Update Product" : "Add Product"}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddProduct;
