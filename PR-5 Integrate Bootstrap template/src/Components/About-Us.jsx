import AboutUs from './About Us/AboutUS';
import BrandOverview from './Brand-intro/Brand-intro';
import CatagoryServices from './Catagory-services/Catagory-services';
import NavbarSection from './Navbar/Navbar';
import TopHeader from './Top-Header/Top-Header';
import OurExperts from './Our-Expert-Team/OurExperts';
import InstagramFollow from './Instagram-follow/Instagram-follow';
import Footer from './Footer/Footer';
import FooterBottom from './Footer-Bottom/Footer-Bottom';
import { Container } from 'react-bootstrap';

const AboutUsMain = () => {
  return (
    <>
      <div className="bg-white ">
        <Container className="p-0" style={{ maxWidth: '1200px' }}>
          <TopHeader />
        </Container>
        <hr className="m-0" style={{ opacity: '0.1' }} />
        <Container className="p-0 sticky-top" style={{ maxWidth: '1200px' }}>
          <NavbarSection />
        </Container>
      </div>

      <AboutUs style={{ maxWidth: '1200px' }} />

      <Container className="p-0" style={{ maxWidth: '1200px' }}>
        <BrandOverview />
      </Container>

      <Container fluid>
        <CatagoryServices />
      </Container>

      <Container className="p-0" style={{ maxWidth: '1200px' }}>
        <OurExperts />
      </Container>

      <InstagramFollow style={{ maxWidth: '1200px' }} />

      <Container fluid className="p-0">
        <Footer />
        <FooterBottom />
      </Container>
    </>
  );
};

export default AboutUsMain;
