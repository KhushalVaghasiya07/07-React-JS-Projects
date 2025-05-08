import React, { useEffect, useState } from 'react';
import './EmployeeManagement.css';
import {
  Container,
  Form,
  Button,
  Table,
  Row,
  Col,
  Modal,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const getStoredEmployees = () => {
  const stored = localStorage.getItem('Employees');
  return stored ? JSON.parse(stored) : [];
};

const saveEmployees = (employees) => {
  localStorage.setItem('Employees', JSON.stringify(employees));
};

const getRandomAvatar = (seed) => {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${seed}`;
};

const EmployeeManagement = () => {
  const initialState = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phone: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [employees, setEmployees] = useState(getStoredEmployees());
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    saveEmployees(employees);
  }, [employees]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(initialState);
    setIsEditing(false);
  };

  const addEmployee = (employee) => {
    const uniqueid = Math.floor(Math.random() * 100000);
    const newEmployee = {
      ...employee,
      id: uniqueid,
    };
    setEmployees((prev) => [...prev, newEmployee]);
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isEditing ? updateEmployee(formData) : addEmployee(formData);
    resetForm();
  };

  const handleEdit = (employee) => {
    setFormData(employee);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    if (formData.id === id) resetForm();
  };

  const handleView = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  return (
    <Container className="mt-4" style={{ maxWidth: '1200px' }}>
      <div className="Employee-text-head p-2 mb-4 rounded">
        <h1 className="m-0 fw-600" style={{ color: '#fff' }}>
          Employee Management
        </h1>
      </div>

      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-body p-4">
          <h5
            className="card-title fs-2 mb-5"
            style={{ color: '#3498db', fontWeight: '500' }}
          >
            {isEditing ? 'Edit Employee' : 'Add New Employee'}
          </h5>

          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formFirstName">
                  <Form.Label className="small">First Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="John"
                    className="py-2"
                    style={{ borderColor: '#e0e0e0' }}
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formLastName">
                  <Form.Label className="small ">Last Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    className="py-2"
                    style={{ borderColor: '#e0e0e0' }}
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formEmail">
                  <Form.Label className="small ">Email *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="john.doe@example.com"
                    className="py-2"
                    style={{ borderColor: '#e0e0e0' }}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formPhone">
                  <Form.Label className="small ">Phone *</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    placeholder="(123) 456-7890"
                    className="py-2"
                    style={{ borderColor: '#e0e0e0' }}
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4" controlId="formAddress">
              <Form.Label className="small">Address *</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="123 Main St, City, State"
                className="py-2"
                style={{ borderColor: '#e0e0e0' }}
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              {isEditing && (
                <Button
                  variant="secondary"
                  className="px-4 py-2 me-2"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData(initialState);
                  }}
                >
                  Cancel
                </Button>
              )}
              <Button
                variant="primary"
                type="submit"
                className="px-4 py-2"
                style={{
                  backgroundColor: '#3498db',
                  borderColor: '#3498db',
                  fontWeight: '500',
                }}
              >
                {isEditing ? 'Update Employee' : 'Add Employee'}
              </Button>
            </div>
          </Form>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <h4
          className="text-start p-3 text-light rounded"
          style={{ backgroundColor: '#3498db' }}
        >
          Employee Details
        </h4>

        <div className="card-body p-0">
          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead style={{ backgroundColor: '#f8f9fa' }}>
                <tr>
                  <th className="py-3 px-4 text-muted small border-0">
                    First Name
                  </th>
                  <th className="py-3 px-4 text-muted small border-0">
                    Last Name
                  </th>
                  <th className="py-3 px-4 text-muted small border-0">Email</th>
                  <th className="py-3 px-4 text-muted small border-0">
                    Address
                  </th>
                  <th className="py-3 px-4 text-muted small border-0">Phone</th>
                  <th className="py-3 px-4 text-muted small border-0 text-end">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {employees.length > 0 ? (
                  employees.map((employee) => (
                    <tr key={employee.id} className="border-top">
                      <td className="py-3 px-4 align-middle">
                        {employee.firstName}
                      </td>
                      <td className="py-3 px-4 align-middle">
                        {employee.lastName}
                      </td>
                      <td className="py-3 px-4 align-middle">
                        {employee.email}
                      </td>
                      <td className="py-3 px-4 align-middle">
                        {employee.address}
                      </td>
                      <td className="py-3 px-4 align-middle">
                        {employee.phone}
                      </td>
                      <td className="py-3 px-5 align-middle text-end">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                          onClick={() => handleView(employee)}
                        >
                          <FaEye className="text-primary" />
                        </Button>
                        <Button
                          variant="outline-warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEdit(employee)}
                        >
                          <FaEdit className="text-warning" />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(employee.id)}
                        >
                          <FaTrash className="text-danger" />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="border-top">
                    <td colSpan="6" className="py-4 text-center text-muted">
                      No employees found. Add one to get started!
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title
            className="text-light p-2 rounded"
            style={{ backgroundColor: '#3498db' }}
          >
            Employee Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEmployee && (
            <div className="text-center">
              <img
                src={getRandomAvatar(
                  `${selectedEmployee.firstName} ${selectedEmployee.lastName}`
                )}
                alt="Profile"
                className="rounded-circle mb-4"
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                }}
              />

              <div className="text-start">
                <h5 className="mb-3">
                  {selectedEmployee.firstName} {selectedEmployee.lastName}
                </h5>

                <div className="mb-3">
                  <h6 className="text-muted small m-0">Email : </h6>
                  <p className="m-0">{selectedEmployee.email}</p>
                </div>

                <div className="mb-3">
                  <h6 className="text-muted small mb-1">Phone</h6>
                  <p>{selectedEmployee.phone}</p>
                </div>

                <div className="mb-3">
                  <h6 className="text-muted small mb-1">Address</h6>
                  <p>{selectedEmployee.address}</p>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <style>
        {`
          .table tbody tr {
            transition: all 0.15s ease;
          }
          .table tbody tr:hover {
            background-color: rgba(52, 152, 219, 0.05) !important;
          }
          .btn-outline-primary:hover {
            background-color: #3498db;
            color: white;
          }
          .btn-outline-danger:hover {
            background-color: #e74c3c;
            color: white;
          }
          .form-control:focus {
            border-color: #3498db;
            box-shadow: 0 0 0 0.2rem rgba(52, 152, 219, 0.1);
          }
        `}
      </style>
    </Container>
  );
};

export default EmployeeManagement;
