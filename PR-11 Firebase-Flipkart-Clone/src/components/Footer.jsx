  import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const FlipkartFooter = () => {
  return (
    <footer className="flipkart-footer text-light">
      <Container fluid className="top-footer py-4 px-md-5">
        <Row className="gx-md-5">
          <Col md={2} sm={6} className="mb-4">
            <h6>ABOUT</h6>
            <ul>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Flipkart Stories</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Corporate Information</a></li>
            </ul>
          </Col>
          <Col md={2} sm={6} className="mb-4">
            <h6>GROUP COMPANIES</h6>
            <ul>
              <li><a href="#">Myntra</a></li>
              <li><a href="#">Cleartrip</a></li>
              <li><a href="#">Shopsy</a></li>
            </ul>
          </Col>
          <Col md={2} sm={6} className="mb-4">
            <h6>HELP</h6>
            <ul>
              <li><a href="#">Payments</a></li>
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Cancellation & Returns</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </Col>
          <Col md={2} sm={6} className="mb-4">
            <h6>CONSUMER POLICY</h6>
            <ul>
              <li><a href="#">Return Policy</a></li>
              <li><a href="#">Terms Of Use</a></li>
              <li><a href="#">Security</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Sitemap</a></li>
              <li><a href="#">Grievance Redressal</a></li>
              <li><a href="#">EPR Compliance</a></li>
            </ul>
          </Col>
          <Col md={2} className="mb-4">
            <h6>Mail Us:</h6>
            <div className="footer-address">
              Flipkart Internet Private Limited,
              Buildings Alyssa, Begonia & Clove Embassy Tech Village,
              Outer Ring Road, Devarabeesanahalli Village,
              Bengaluru, 560103, Karnataka, India
            </div>
            <h6 className="mt-3">Social:</h6>
            <div className="social-icons">
              <i className="bi bi-facebook"></i>
              <i className="bi bi-twitter-x"></i>
              <i className="bi bi-youtube"></i>
              <i className="bi bi-instagram"></i>
            </div>
          </Col>
          <Col md={2} className="mb-4">
            <h6>Registered Office Address:</h6>
            <div className="footer-address">
              Flipkart Internet Private Limited,
              Buildings Alyssa, Begonia & Clove Embassy Tech Village,
              Outer Ring Road, Devarabeesanahalli Village,
              Bengaluru, 560103, Karnataka, India
              CIN: U51109KA2012PTC066107
              Telephone: <a href="tel:04445614700">044-45614700</a> / <a href="tel:04467415800">044-67415800</a>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="footer-divider"></div>
      <Container className="bottom-footer py-3 px-md-5">
        <Row className="align-items-center">
          <Col md={3} sm={6} className="mb-2 mb-md-0"><i className="bi bi-bag me-2"></i>Become a Seller</Col>
          <Col md={2} sm={6} className="mb-2 mb-md-0"><i className="bi bi-bullhorn me-2"></i>Advertise</Col>
          <Col md={2} sm={6} className="mb-2 mb-md-0"><i className="bi bi-gift me-2"></i>Gift Cards</Col>
          <Col md={2} sm={6} className="mb-2 mb-md-0"><i className="bi bi-question-circle me-2"></i>Help Center</Col>
          <Col md={3} className="text-md-end mt-2 mt-md-0">
            <div>© 2007–2025 <span className="text-warning">Flipkart.com</span></div>
            <img
              src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg"
              alt="payment methods"
              className="img-fluid payment-methods"
            />
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FlipkartFooter;