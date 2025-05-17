import { Table, Card, Container, Button } from 'react-bootstrap';
import './PatientData.css';
import { useEffect, useState } from 'react';
import { getStorageData, setStorageData } from '../Services/service';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PatientViewModal from './PatientViewModal';

const PatientData = () => {
  const [PatientInfo, setPatientInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    setPatientInfo(getStorageData());
  }, []);

  const handledelete = (id) => {
    const updatedData = PatientInfo.filter((patient) => patient.id !== id);
    setPatientInfo(updatedData);
    setStorageData(updatedData);
  };

  const handleView = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPatient(null);
  };

  return (
    <Container className="patient-data-container">
      <Card className="patient-data-card">
        <Card.Body>
          <h3 className="patient-data-header">Patient Records</h3>
          <div className="table-responsive-md">
            <Table striped bordered hover className="table-patient">
              <thead>
                <tr>
                  <th>Case Number</th>
                  <th>Patient Name</th>
                  <th>Gender</th>
                  <th>Admit Date</th>
                  <th>Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {PatientInfo.map((Patient) => (
                  <tr key={Patient.id}>
                    <td>{Patient.id}</td>
                    <td>{Patient.patientname}</td>
                    <td>{Patient.Gender}</td>
                    <td>{Patient.DOB}</td>
                    <td>{Patient.contact}</td>
                    <td className="d-flex gap-2">
                      <Button
                        onClick={() => handleView(Patient)}
                        className="btn btn-action btn-view"
                      >
                        <FaEye />
                      </Button>
                      <Link to={`/edit-patient/${Patient.id}`}>
                        <Button
                          variant="warning"
                          className="btn btn-action btn-edit"
                        >
                          <FaEdit />
                        </Button>
                      </Link>
                      <Button
                        onClick={() => handledelete(Patient.id)}
                        variant="danger"
                        className="btn btn-action btn-delete"
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {selectedPatient && (
        <PatientViewModal
          show={showModal}
          handleClose={handleCloseModal}
          patient={selectedPatient}
        />
      )}
    </Container>
  );
};

export default PatientData;
