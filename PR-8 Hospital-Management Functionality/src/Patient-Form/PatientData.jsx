import {
  Table,
  Card,
  Container,
  Button,
  Form,
  Pagination,
} from 'react-bootstrap';
import './PatientData.css';
import { useEffect, useState } from 'react';
import { getStorageData, setStorageData } from '../Services/service';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PatientViewModal from './PatientViewModal';

const PatientData = () => {
  const [allPatients, setAllPatients] = useState([]);
  const [displayedPatients, setDisplayedPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(5); // Number of patients per page

  useEffect(() => {
    const data = getStorageData();
    setAllPatients(data);
    setDisplayedPatients(data);
  }, []);

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = displayedPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );
  const totalPages = Math.ceil(displayedPatients.length / patientsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
    const updatedData = allPatients.filter((patient) => patient.id !== id);
    setAllPatients(updatedData);
    setDisplayedPatients(updatedData);
    setStorageData(updatedData);
    setCurrentPage(1);
  };

  const handleView = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPatient(null);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setDisplayedPatients(allPatients);
      setCurrentPage(1); // Reset to first page when clearing search
      return;
    }

    const filteredPatients = allPatients.filter((patient) => {
      return (
        patient.patientname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.Gender?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.contact?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id?.toString().includes(searchTerm)
      );
    });

    setDisplayedPatients(filteredPatients);
    setCurrentPage(1); // Reset to first page after search
  };

  const handleClear = () => {
    setSearchTerm('');
    setDisplayedPatients(allPatients);
    setCurrentPage(1); // Reset to first page when clearing
  };

  const handleSorting = (type, field) => {
    let data = [...displayedPatients];
    let updatedData;

    if (type === 'asc') {
      if (field === 'id' || field === 'contact') {
        updatedData = data.sort((a, b) => a[field] - b[field]);
      } else {
        updatedData = data.sort((a, b) => a[field]?.localeCompare(b[field]));
      }
    } else {
      if (field === 'id' || field === 'contact') {
        updatedData = data.sort((a, b) => b[field] - a[field]);
      } else {
        updatedData = data.sort((a, b) => b[field]?.localeCompare(a[field]));
      }
    }

    setDisplayedPatients(updatedData);
    setCurrentPage(1); // Reset to first page after sorting
  };

  // Generate pagination items
  let paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => paginate(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Container className="patient-data-container">
      <Card className="patient-data-card">
        <Card.Body>
          <div className="Patient d-flex m-3 justify-content-between align-items-center">
            <h3 className="patient-data-header m-0">Patient Records</h3>
            <div className="d-flex gap-2">
              <Form.Control
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '300px' }}
              />
              <Button variant="success" onClick={handleSearch}>
                Search
              </Button>
              <Button variant="warning" onClick={handleClear}>
                Clear
              </Button>
            </div>
          </div>
          <div className="table-responsive-md">
            <Table striped bordered hover className="table-patient">
              <thead>
                <tr>
                  <th>
                    Case Number
                    <Button
                      variant="link"
                      onClick={() => handleSorting('asc', 'id')}
                    >
                      ⬆
                    </Button>
                    <Button
                      variant="link"
                      onClick={() => handleSorting('desc', 'id')}
                    >
                      ⬇
                    </Button>
                  </th>
                  <th>
                    Patient Name
                    <Button
                      variant="link"
                      onClick={() => handleSorting('asc', 'patientname')}
                    >
                      ⬆
                    </Button>
                    <Button
                      variant="link"
                      onClick={() => handleSorting('desc', 'patientname')}
                    >
                      ⬇
                    </Button>
                  </th>
                  <th>
                    Gender
                    <Button
                      variant="link"
                      onClick={() => handleSorting('asc', 'Gender')}
                    >
                      ⬆
                    </Button>
                    <Button
                      variant="link"
                      onClick={() => handleSorting('desc', 'Gender')}
                    >
                      ⬇
                    </Button>
                  </th>
                  <th>
                    Admit Date
                    <Button
                      variant="link"
                      onClick={() => handleSorting('asc', 'DOB')}
                    >
                      ⬆
                    </Button>
                    <Button
                      variant="link"
                      onClick={() => handleSorting('desc', 'DOB')}
                    >
                      ⬇
                    </Button>
                  </th>
                  <th>
                    Contact
                    <Button
                      variant="link"
                      onClick={() => handleSorting('asc', 'contact')}
                    >
                      ⬆
                    </Button>
                    <Button
                      variant="link"
                      onClick={() => handleSorting('desc', 'contact')}
                    >
                      ⬇
                    </Button>
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPatients.length > 0 ? (
                  currentPatients.map((patient) => (
                    <tr key={patient.id}>
                      <td>{patient.id}</td>
                      <td>{patient.patientname}</td>
                      <td>{patient.Gender}</td>
                      <td>{patient.DOB}</td>
                      <td>{patient.contact}</td>
                      <td className="d-flex gap-2">
                        <Button
                          onClick={() => handleView(patient)}
                          className="btn btn-action btn-view"
                        >
                          <FaEye />
                        </Button>
                        <Link to={`/edit-patient/${patient.id}`}>
                          <Button
                            variant="warning"
                            className="btn btn-action btn-edit"
                          >
                            <FaEdit />
                          </Button>
                        </Link>
                        <Button
                          onClick={() => handleDelete(patient.id)}
                          variant="danger"
                          className="btn btn-action btn-delete"
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No patients found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

            {/* Pagination */}
            {displayedPatients.length > patientsPerPage && (
              <div className="d-flex justify-content-center">
                <Pagination>
                  <Pagination.First
                    onClick={() => paginate(1)}
                    disabled={currentPage === 1}
                  />
                  <Pagination.Prev
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  {paginationItems}
                  <Pagination.Next
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                  <Pagination.Last
                    onClick={() => paginate(totalPages)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </div>
            )}
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
