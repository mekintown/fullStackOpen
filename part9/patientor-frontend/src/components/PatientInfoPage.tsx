import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { useEffect, useState } from "react";
import { Patient } from "../types";

const PatientInfoPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const id = useParams().id;

  useEffect(() => {
    const fetchPatientInfo = async () => {
      if (id) {
        const patient = await patientService.get(id);
        setPatient(patient);
      }
    };
    fetchPatientInfo();
  }, [id]);

  if (!patient) {
    return (
      <div>
        <p>no information</p>
      </div>
    );
  }

  return (
    <div>
      <h3>
        {patient.name} | {patient.gender}
      </h3>

      <p>ssh: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h2>entries</h2>
      {patient.entries.map((entry) => (<div> 
        <p>{entry.date} | {entry.description}</p>
        {entry.diagnosisCodes ? (
  <ul>
    {entry.diagnosisCodes.map((code) => (
      <li key={code}>{code}</li>
    ))}
  </ul>
) : (
  <p>No diagnosis codes available.</p>
)}
      </div>))}
    </div>
  );
};

export default PatientInfoPage;
