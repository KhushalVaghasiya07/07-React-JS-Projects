import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getStorageData, setStorageData } from '../Services/service';
import './PatientForm.css';

const HospitalAdmissionForm = () => {
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
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handlechanged = (e) => {
    const { name, value } = e.target;
    setInputform({ ...inputform, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!inputform.patientname.trim()) {
      newErrors.patientname = "Patient name is required";
    } else if (inputform.patientname.trim().length < 3) {
      newErrors.patientname = "Name must be at least 3 characters";
    }

    if (!inputform.DOB) {
      newErrors.DOB = "Admit date is required";
    }

    if (!inputform.Gender) {
      newErrors.Gender = "Gender is required";
    }

    if (!inputform.contact) {
      newErrors.contact = "Contact number is required";
    } else if (!/^\d{10,}$/.test(inputform.contact)) {
      newErrors.contact = "Enter a valid contact number";
    }

    if (!inputform.ReasonDisc.trim()) {
      newErrors.ReasonDisc = "Reason for admission is required";
    } else if (inputform.ReasonDisc.trim().length < 10) {
      newErrors.ReasonDisc = "Please provide more details (at least 10 characters)";
    }

    return newErrors;
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);

      const id = Math.floor(Math.random() * 10000);
      const updatedData = [...getStorageData(), { ...inputform, id }];
      setStorageData(updatedData);

      setIsSubmitting(false);
      setInputform(initialstate);
      navigate('/');
    }
  };

  return (
    <Container className="simple-admission-container">
      <Card className="simple-admission-card mt-5">
        <Card.Body>
          <h3 className="text-center mb-4">Patient Admission</h3>

          <Form onSubmit={handlesubmit}>
            <Row className="mb-3">
              <Col md={8}>
                <Form.Group controlId="formFullName">
                  <Form.Label>Full Name *</Form.Label>
                  <Form.Control
                    name="patientname"
                    value={inputform.patientname}
                    type="text"
                    placeholder="Patient's full name"
                    onChange={handlechanged}
                    isInvalid={!!errors.patientname}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.patientname}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formBirthDate">
                  <Form.Label>Admit Date *</Form.Label>
                  <Form.Control
                    type="date"
                    name="DOB"
                    value={inputform.DOB}
                    onChange={handlechanged}
                    isInvalid={!!errors.DOB}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.DOB}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="formGender">
                  <Form.Label>Gender *</Form.Label>
                  <div className={`gender-selection ${errors.Gender ? 'is-invalid' : ''}`}>
                    <Form.Check
                      inline
                      type="radio"
                      onChange={handlechanged}
                      name="Gender"
                      value="male"
                      checked={inputform.Gender === 'male'}
                      label="Male"
                      id="male-radio"
                    />
                    <Form.Check
                      inline
                      type="radio"
                      onChange={handlechanged}
                      name="Gender"
                      value="female"
                      checked={inputform.Gender === 'female'}
                      label="Female"
                      id="female-radio"
                    />
                  </div>
                  {errors.Gender && (
                    <div className="invalid-feedback d-block">
                      {errors.Gender}
                    </div>
                  )}
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formBloodType">
                  <Form.Label>Blood Group</Form.Label>
                  <Form.Select
                    onChange={handlechanged}
                    name="bloodgroup"
                    value={inputform.bloodgroup}
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
                    value={inputform.contact}
                    type="tel"
                    placeholder="Emergency contact"
                    onChange={handlechanged}
                    isInvalid={!!errors.contact}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.contact}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4" controlId="formReason">
              <Form.Label>Reason for Admission *</Form.Label>
              <Form.Control
                name="ReasonDisc"
                value={inputform.ReasonDisc}
                as="textarea"
                rows={2}
                placeholder="Brief description of symptoms"
                onChange={handlechanged}
                isInvalid={!!errors.ReasonDisc}
              />
              <Form.Control.Feedback type="invalid">
                {errors.ReasonDisc}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formAllergies">
              <Form.Label>Known Allergies</Form.Label>
              <Form.Control
                type="text"
                placeholder="List any allergies"
                name="Allergies"
                value={inputform.Allergies}
                onChange={handlechanged}
              />
            </Form.Group>

            <div className="text-center">
              <Button
                variant="success"
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Admission'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default HospitalAdmissionForm;