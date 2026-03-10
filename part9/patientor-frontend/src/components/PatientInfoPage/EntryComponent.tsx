import { Box } from "@mui/material";
import { Entry } from "../../types";

interface Props {
  entry: Entry;
}

const EntryComponent = ({ entry }: Props) => {
  return (
    <Box>
      <h4>{entry.date}</h4>
      <p><em>{entry.description}</em></p>
      {entry.diagnosisCodes && (
        <>
          <p>Diagnoses:</p>
          <ul>
            {entry.diagnosisCodes.map(code => <li key={code}>{code}</li>)}
          </ul>
        </>
      )}
    </Box>
  );
};

export default EntryComponent;
