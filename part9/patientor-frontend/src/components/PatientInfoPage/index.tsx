import { useMatch } from "react-router-dom";
import { Male, Female, HelpOutline } from "@mui/icons-material";
import patientService from "../../services/patients";
import { Gender, Patient } from "../../types";
import { useEffect, useState } from "react";

interface Props {
  patients: Patient[];
}

const PatientInfoPage = ({ patients }: Props) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const match = useMatch("/patients/:id");
  const foundPatient: Patient | null | undefined = match
    ? patients.find(patient => patient.id === match.params.id)
    : null;
  useEffect(() => {
    if (foundPatient) {
      patientService.getById(foundPatient.id).then(data => {
        setPatient(data);
      });
    }
  }, [foundPatient]);

  if (!patient) {
    return <h2>Patient not found!</h2>;
  }

  return (
    <>
      <h2>{patient.name}<Icon gender={patient.gender} /></h2>
      <p>Date of birth: {patient.dateOfBirth}</p>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
    </>
  );
};

const Icon = ({ gender }: { gender: Gender }) => {
  switch (gender) {
    case "male":
      return <Male />;
    case "female":
      return <Female />;
    default:
      return <HelpOutline />;
  }
};

export default PatientInfoPage;
