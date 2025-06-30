import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./addProductForm.css";

// Firebase Firestore
import { database } from "../firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";

const AddProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isEditMode = Boolean(id);
  const product = location.state?.product || null;

  const [formData, setFormData] = useState({
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

  useEffect(() => {
    if (isEditMode && product) {
      setFormData(product);
    }
  }, [product, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        const productRef = doc(database, "products", id);
        await updateDoc(productRef, formData);
        alert("Product updated successfully!");
      } else {
        await addDoc(collection(database, "products"), formData);
        alert("Product added to Firebase!");
      }
      navigate("/");
    } catch (error) {
      console.error("Firebase Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <Container className="add-product-form mt-4">
      <div className="d-flex justify-content-center mb-4">
        <h2 className="form-title">
          {isEditMode ? "Edit Product" : "Add New Product"}
        </h2>
      </div>

      <Form onSubmit={handleSubmit} className="flipkart-form">
        <div className="form-header">
          {isEditMode ? "EDIT PRODUCT DETAILS" : "ADD NEW PRODUCT"}
        </div>

        <div className="form-body p-4">
          <Row className="mb-4">
            <Col md={6} className="mb-3 mb-md-0">
              <Form.Group controlId="productName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="productPrice">
                <Form.Label>Price (₹)</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={6} className="mb-3 mb-md-0">
              <Form.Group controlId="productCategory">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a category</option>
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
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Paste image URL"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-4" controlId="productDesc">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              placeholder="Enter product description"
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit" className="submit-btn">
              {isEditMode ? "UPDATE PRODUCT" : "ADD PRODUCT"}
            </Button>
          </div>
        </div>
      </Form>
    </Container>
  );
};

export default AddProduct;
