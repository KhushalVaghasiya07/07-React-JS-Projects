import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { signUpAsync } from '../../redux/Actions/authActions';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Sign_Up = () => {
  const [formData, setFormData] = useState({ email: '', password: '', cpassword: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isCreated, errorMSG } = useSelector((state) => state.authReducer);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.cpassword) {
      toast.error("Passwords don't match");
    } else {
      dispatch(signUpAsync(formData));
    }
  };

  useEffect(() => {
    if (isCreated) {
      toast.success("Account created successfully!");
      setTimeout(() => navigate('/Sign_In'), 1500);
    }
  }, [isCreated]);

  return (
    <div className="container my-4">
      <ToastContainer />
      <h3>Create Account</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" name="cpassword" value={formData.cpassword} onChange={handleChange} required />
        </Form.Group>
        {errorMSG && <p className="text-danger">{errorMSG}</p>}
        <Button type="submit">Sign Up</Button>
      </Form>
    </div>
  );
};

export default Sign_Up;
