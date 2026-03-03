import { NewPatient } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect name');
  };

  return name;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect ssn');
  };

  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect occupation');
  };

  return occupation;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  };

  return date;
};

const isGender = (gender: string): boolean => {
  return ["male", "female", "other"].includes(gender);
}

const parseGender = (gender: unknown): "male" | "female" | "other" => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Invalid gender: ' + gender);
  };

  return gender as "male" | "female" | "other";
}

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  };

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'gender' in object &&
    'ssn' in object &&
    'occupation' in object
  ) {
    const newEntry: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseGender(object.gender),
      ssn: parseSsn(object.ssn),
      occupation: parseOccupation(object.occupation),
    };

    return newEntry;
  };

  throw new Error('Incorrect data: some fields are missing');
};
