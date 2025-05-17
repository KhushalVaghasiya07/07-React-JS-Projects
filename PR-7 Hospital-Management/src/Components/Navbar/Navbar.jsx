import { Button, Container } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import hospitallogo from '../../assets/Images/Hospitallogo.png';
import { Link, useNavigate } from 'react-router-dom';

const HospitalNavbar = () => {
  const navigate = useNavigate();
  const handelform = () => {
    navigate('/patienadd');
  };

  return (
    <>
      <Navbar style={{backgroundColor: '#f8f9fa' }}>
        <Container>
          <Navbar.Brand href="#home">
            <Link to={'/'}>
              <img src={hospitallogo} alt="" width={100} />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Button
                className="fw-semibold"
                onClick={handelform}
                style={{ padding: '13px 25px' }}
                variant="success"
              >
                {' '}
                Add Patient Details
              </Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default HospitalNavbar;
