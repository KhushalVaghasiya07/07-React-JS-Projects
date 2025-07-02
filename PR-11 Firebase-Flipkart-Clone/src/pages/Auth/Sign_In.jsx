import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Container, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { googleSignInAsync, signInAsync } from '../../redux/Actions/authActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignIn.css'; // We'll create this CSS file

const SignIn = () => {
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
    dispatch(signInAsync(formData)).finally(() => setIsSubmitting(false));
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
  }, [user, navigate]);

  return (
    <>
      <ToastContainer position="bottom-right" />
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Card className="p-4 shadow-sm flipkart-signin-card">
          <div className="text-center mb-4">
            <h3 className="fw-bold" style={{ color: '#2874f0' }}>Login</h3>
            <p className="text-muted">Get access to your Orders, Wishlist and Recommendations</p>
          </div>

          {errorMSG && <Alert variant="danger" className="py-2">{errorMSG}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 position-relative">
              <Form.Label>Email</Form.Label>
              <div className="position-relative">
                <AiOutlineMail className="position-absolute input-icon" />
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="ps-4"
                  required
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3 position-relative">
              <Form.Label>Password</Form.Label>
              <div className="position-relative">
                <AiOutlineLock className="position-absolute input-icon" />
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="ps-4"
                  required
                />
              </div>
            </Form.Group>

            <p className="small text-end mb-3">
              <Link to="/forgot-password" className="text-primary">Forgot Password?</Link>
            </p>

            <Button
              variant="primary"
              type="submit"
              className="w-100 mb-3 py-2 fw-bold"
              disabled={isSubmitting}
              style={{ backgroundColor: '#fb641b', border: 'none' }}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Logging In...
                </>
              ) : (
                'Login'
              )}
            </Button>

            <div className="divider d-flex align-items-center mb-3">
              <div className="line"></div>
              <span className="px-2 text-muted small">OR</span>
              <div className="line"></div>
            </div>

            <Button
              variant="outline-primary"
              className="w-100 d-flex align-items-center justify-content-center py-2 mb-3"
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
            >
              <FcGoogle className="me-2" size={20} />
              Continue with Google
            </Button>

            <div className="text-center mt-4">
              <Link to="/Sign_Up" className="text-primary fw-bold" style={{ color: '#2874f0' }}>
                New to Flipkart? Create an account
              </Link>
            </div>
          </Form>
        </Card>
      </Container>
    </>
  );
};

export default SignIn;