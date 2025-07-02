import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Card, Alert, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { signUpAsync } from '../../redux/Actions/authActions';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { AiOutlineMail, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import 'react-toastify/dist/ReactToastify.css';
import './SignUp.css'; // We'll create this CSS file

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    cpassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isCreated, errorMSG } = useSelector((state) => state.authReducer || {});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formData.password !== formData.cpassword) {
      toast.error("Passwords don't match");
      setIsSubmitting(false);
    } else {
      dispatch(signUpAsync(formData)).finally(() => setIsSubmitting(false));
    }
  };

  useEffect(() => {
    if (isCreated) {
      toast.success("Account created successfully!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: {
          backgroundColor: '#2874f0',
          color: '#fff'
        }
      });
      setTimeout(() => navigate('/sign_in'), 1500);
    }
  }, [isCreated, navigate]);

  return (
    <div className="signup-page-wrapper">
      <ToastContainer />
      <Container fluid className="px-0">
        <Row className="g-0">


          {/* Right Side - Sign Up Form */}
            <div className="form-container">
              <Card className="signup-card">
                <Card.Body>
                  <div className="text-center mb-4">
                    <h3 className="fw-bold brand-text">Create Account</h3>
                    <p className="text-muted subtext">Get access to your Orders, Wishlist and Recommendations</p>
                  </div>

                  {errorMSG && (
                    <Alert variant="danger" className="py-2 text-center">
                      {errorMSG}
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3 form-group-custom">
                      <Form.Label className="form-label-custom">Email</Form.Label>
                      <div className="input-group-custom">
                        <AiOutlineMail className="input-icon" />
                        <Form.Control
                          type="email"
                          placeholder="Enter Email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          className="form-control-custom"
                          required
                        />
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-3 form-group-custom">
                      <Form.Label className="form-label-custom">Password</Form.Label>
                      <div className="input-group-custom">
                        <AiOutlineLock className="input-icon" />
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter Password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          className="form-control-custom"
                          required
                          minLength={6}
                        />
                        <div
                          className="password-toggle"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </div>
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-4 form-group-custom">
                      <Form.Label className="form-label-custom">Confirm Password</Form.Label>
                      <div className="input-group-custom">
                        <AiOutlineLock className="input-icon" />
                        <Form.Control
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm Password"
                          name="cpassword"
                          value={formData.cpassword}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          className="form-control-custom"
                          required
                          minLength={6}
                        />
                        <div
                          className="password-toggle"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </div>
                      </div>
                    </Form.Group>

                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100 mb-3 signup-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Creating Account...
                        </>
                      ) : (
                        'Continue'
                      )}
                    </Button>

                    <div className="text-center mt-4 login-link-container">
                      <span className="text-muted">Already have an account?</span>{' '}
                      <Link to="/sign_in  " className="login-link">
                        Login
                      </Link>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </div>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;