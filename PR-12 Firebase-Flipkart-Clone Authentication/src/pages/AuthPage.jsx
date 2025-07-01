// src/pages/AuthPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginUser,
  signupUser,
  loginWithGoogle,
} from '../redux/Actions/authActions'; // Import auth actions
import './AuthPage.css'; // Import the CSS file
import loginImg from '../assets/Flipkart-login.png'; // Assuming this image exists

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get auth state from Redux store
  const { currentUser, loading, error } = useSelector((state) => state.auth);

  const [isLogin, setIsLogin] = useState(true); // true for Login, false for Signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // For signup

  // Redirect if user is already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/'); // Redirect to home page
    }
  }, [currentUser, navigate]);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      // Basic client-side validation
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      // Signup password mismatch
      alert("Passwords do not match!"); // Using alert for quick feedback, consider a custom modal
      return;
    }

    let success = false;
    if (isLogin) {
      success = await dispatch(loginUser(email, password));
    } else {
      success = await dispatch(signupUser(email, password));
    }

    // Redirection handled by useEffect based on currentUser
  };

  const handleGoogleAuth = async () => {
    await dispatch(loginWithGoogle());
    // Redirection handled by useEffect based on currentUser
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left Section (Blue Background) */}
        <div className="auth-left">
          <h2>{isLogin ? 'Login' : 'Signup'}</h2>
          <p>Get access to your Orders, Wishlist and Recommendations</p>
          <img src={loginImg} alt="Login Visual" className="auth-image" />
        </div>

        {/* Right Section (Form) */}
        <div className="auth-right">
          <form onSubmit={handleAuthSubmit} className="auth-form">
            <div className="form-group">
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="auth-input"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="auth-input"
              />
            </div>

            {!isLogin && ( // Only show confirm password for signup
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="auth-input"
                />
              </div>
            )}

            {error && <p className="auth-error-message">{error}</p>}

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? (
                'Loading...'
              ) : isLogin ? (
                'Login'
              ) : (
                'Signup'
              )}
            </button>

            <p className="auth-terms">
              By continuing, you agree to Flipkart's{' '}
              <a href="#" className="terms-link">Terms of Use</a> and{' '}
              <a href="#" className="terms-link">Privacy Policy</a>.
            </p>

            {/* Google Login Button */}
            <button
              type="button"
              className="auth-google-btn"
              onClick={handleGoogleAuth}
              disabled={loading}
            >
              Sign in with Google
            </button>

            {/* Toggle between Login and Signup */}
            <div className="auth-toggle-link">
              {isLogin ? (
                <p>
                  New to Flipkart?{' '}
                  <span onClick={() => setIsLogin(false)} className="toggle-btn">
                    Create an account
                  </span>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <span onClick={() => setIsLogin(true)} className="toggle-btn">
                    Login
                  </span>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;