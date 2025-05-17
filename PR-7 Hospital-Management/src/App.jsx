import { Route, Routes } from 'react-router-dom';
import './App.css';
import HospitalNavbar from './Components/Navbar/Navbar.jsx';
import PatientData from './Patient-Form/PatientData.jsx';
import HospitalAdmissionForm from './Patient-Form/PatientForm.jsx';
import EditPatient from './Patient-Form/EditPatient.jsx';

function App() {
  return (
    <>
      <HospitalNavbar />
      <Routes>
        <Route path="/" element={<PatientData />} />
        <Route path="/patienadd" element={<HospitalAdmissionForm />} />
        <Route path="/edit-patient/:id" element={<EditPatient />} />
      </Routes>
    </>
  );
}

export default App;
