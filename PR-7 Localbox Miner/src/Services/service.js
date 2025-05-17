export const setStorageData = (PatientData) => {
  localStorage.setItem('PatientsInfo', JSON.stringify(PatientData));
};

export const getStorageData = () => {
  return JSON.parse(localStorage.getItem('PatientsInfo')) || [];
};
