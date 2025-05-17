import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Badge, Row, Col } from 'react-bootstrap';

const PatientViewModal = ({ show, handleClose, patient }) => {
  const getBloodGroupColor = (bloodGroup) => {
    if (!bloodGroup) return 'secondary';
    if (bloodGroup.includes('+')) return 'danger';
    if (bloodGroup.includes('-')) return 'primary';
    return 'secondary';
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Patient Details - Case #{patient?.id}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row className="mb-3">
          <Col md={6}>
            <h5>Basic Information</h5>
            <div className="mb-2">
              <strong>Full Name:</strong> {patient?.patientname}
            </div>
            <div className="mb-2">
              <strong>Gender:</strong> {patient?.Gender}
            </div>
            <div className="mb-2">
              <strong>Admit Date:</strong> {patient?.DOB}
            </div>
          </Col>

          <Col md={6}>
            <h5>Medical Information</h5>
            <div className="mb-2">
              <strong>Blood Group:</strong>
              {patient?.bloodgroup ? (
                <Badge
                  bg={getBloodGroupColor(patient.bloodgroup)}
                  className="ms-2"
                >
                  {patient.bloodgroup}
                </Badge>
              ) : (
                ' Unknown'
              )}
            </div>
            <div className="mb-2">
              <strong>Contact:</strong> {patient?.contact}
            </div>
            <div className="mb-2">
              <strong>Allergies:</strong>{' '}
              {patient?.Allergies || 'None reported'}
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <h5>Reason for Admit</h5>
            <div className="p-3 bg-light rounded">{patient?.ReasonDisc}</div>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="success" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PatientViewModal;
