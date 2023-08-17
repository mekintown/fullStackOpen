import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { useEffect, useState } from "react";
import { DiagnoseEntry, Patient } from "../types";
import diagnoseService from "../services/diagnose";

const PatientInfoPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<DiagnoseEntry[]>();
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

  useEffect(() => {
    const fetchDiagnosesInfo = async () => {
      const diagnoses = await diagnoseService.getAll();
      setDiagnoses(diagnoses)
    }
    fetchDiagnosesInfo();
  }, [])

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
  {entry.diagnosisCodes.map((code) => {
    if (diagnoses) {
      const diagnosis = diagnoses.find((diagnosis) => diagnosis.code === code);
      if (diagnosis) {
        return (
          <li key={code}>
            {code} - {diagnosis.name}
          </li>
        );
      } 
    }else {
      return (
        <li key={code}>
          {code} - Diagnosis not found
        </li>
      );
    }
  })}
</ul>
) : (
  <p>No diagnosis codes available.</p>
)}
      </div>))}
    </div>
  );
};

export default PatientInfoPage;
