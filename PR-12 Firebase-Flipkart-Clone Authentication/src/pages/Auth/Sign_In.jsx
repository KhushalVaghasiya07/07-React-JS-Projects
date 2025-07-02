import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { googleSignInAsync, signInAsync } from '../../redux/Actions/authActions';
import { ToastContainer, toast } from 'react-toastify';

const Sign_In = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, errorMSG } = useSelector(state => state.authReducer);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    dispatch(signINAsync(formData)).finally(() => setIsSubmitting(false));
  };

  const handleGoogleSignIn = () => {
    setIsSubmitting(true);
    dispatch(googleSignInAsync()).finally(() => setIsSubmitting(false));
  };

  const prevUser = useRef(null);

  useEffect(() => {
    if (user && !prevUser.current) {
      toast.success("Login successful!");
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
    prevUser.current = user;
  }, [user]);

  return (
    <>
      <ToastContainer />
      <div className="product-form-container">
        <div className="form-card" style={{ maxWidth: "700px" }}>
          <div className="form-title d-flex align-items-center mb-4">
            <FaUser className="me-2" />
            <h3>Sign In</h3>
          </div>

          {errorMSG && <p className="text-danger small">{errorMSG}</p>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 mb-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>

            <div className="divider text-center text-muted mb-3">OR</div>

            <Button
              variant="outline-danger"
              className="w-100 d-flex align-items-center justify-content-center"
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
            >
              <FaGoogle className="me-2" />
              Sign in with Google
            </Button>

            <div className="text-center mt-3">
              <span>Don't have an account?</span>{' '}
              <Link to="/sign_up" className="text-primary fw-bold">Sign up</Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Sign_In;
