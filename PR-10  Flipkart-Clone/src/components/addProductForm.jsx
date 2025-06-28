import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./addProductForm.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductById,
  addNewProduct,
  updateProductData,
} from "../redux/Actions/productActions";

const AddProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isEditMode = Boolean(id);
  const { product } = useSelector((state) => state.productReducer);

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
    if (isEditMode) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id, isEditMode]);

  useEffect(() => {
    if (isEditMode && product) {
      setFormData(product);
    }
  }, [product, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      dispatch(updateProductData(id, formData));
      alert("Product updated successfully!");
    } else {
      dispatch(addNewProduct(formData));
      alert("Product added successfully!");
    }
    navigate("/");
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
                value={formData.name}
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
                value={formData.price}
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
                value={formData.category}
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
                value={formData.image}
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
            value={formData.desc}
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
