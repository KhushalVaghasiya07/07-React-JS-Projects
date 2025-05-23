import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getStorageData, setStorageData } from '../Services/service';
import './PatientForm.css';

const EditPatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialstate = {
    id: '',
    patientname: '',
    DOB: '',
    Gender: '',
    contact: '',
    bloodgroup: '',
    Allergies: '',
    ReasonDisc: '',
  };

  const [inputform, setInputform] = useState(initialstate);

  const handlechanged = (e) => {
    const { name, value } = e.target;
    setInputform({ ...inputform, [name]: value });
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    let patients = getStorageData();
    let updatedData = patients.map((patient) => {
      if (patient.id == inputform.id) {
        return inputform;
      } else {
        return patient;
      }
    });

    setStorageData(updatedData);
    setInputform(initialstate);
    navigate('/');
  };

  useEffect(() => {
    let patients = getStorageData();
    let singlePatient = patients.find((patient) => patient.id == id);
    setInputform(singlePatient);
  }, [id]);

  return (
    <Container className="simple-admission-container">
      <Card className="simple-admission-card mt-5">
        <Card.Body>
          <h3 className="text-center mb-4">Edit Patient Details</h3>

          <Form onSubmit={handlesubmit}>
            <Row className="mb-3">
              <Col md={8}>
                <Form.Group controlId="formFullName">
                  <Form.Label>Full Name *</Form.Label>
                  <Form.Control
                    name="patientname"
                    value={inputform.patientname || ''}
                    type="text"
                    placeholder="Patient's full name"
                    onChange={handlechanged}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formBirthDate">
                  <Form.Label>Admit Date *</Form.Label>
                  <Form.Control
                    type="date"
                    name="DOB"
                    value={inputform.DOB || ''}
                    onChange={handlechanged}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="formGender">
                  <Form.Label>Gender *</Form.Label>
                  <div>
                    <input
                      type="radio"
                      onChange={handlechanged}
                      name="Gender"
                      value="male"
                      checked={inputform.Gender === 'male'}
                    />{' '}
                    Male
                    <input
                      type="radio"
                      onChange={handlechanged}
                      name="Gender"
                      value="female"
                      checked={inputform.Gender === 'female'}
                      style={{ marginLeft: '10px' }}
                    />{' '}
                    Female
                  </div>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formBloodType">
                  <Form.Label>Blood Type</Form.Label>
                  <Form.Select
                    onChange={handlechanged}
                    name="bloodgroup"
                    value={inputform.bloodgroup || ''}
                  >
                    <option value="">Unknown</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formPhone">
                  <Form.Label>Phone *</Form.Label>
                  <Form.Control
                    name="contact"
                    value={inputform.contact || ''}
                    type="tel"
                    placeholder="Emergency contact"
                    onChange={handlechanged}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4" controlId="formReason">
              <Form.Label>Reason for Admission *</Form.Label>
              <Form.Control
                name="ReasonDisc"
                value={inputform.ReasonDisc || ''}
                as="textarea"
                rows={2}
                placeholder="Brief description of symptoms"
                onChange={handlechanged}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formAllergies">
              <Form.Label>Known Allergies</Form.Label>
              <Form.Control
                type="text"
                placeholder="List any allergies"
                name="Allergies"
                value={inputform.Allergies || ''}
                onChange={handlechanged}
              />
            </Form.Group>

            <div className="text-center">
              <Button variant="success" type="submit" className="submit-btn">
                Update Patient
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditPatient;
