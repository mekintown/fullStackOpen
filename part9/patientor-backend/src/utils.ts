import { NewPatientEntry, Gender, Entry } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error(`Incorrect name ${name}`);
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error(`Incorrect date ${date}`);
  }

  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error(`Incorrect ssn ${ssn}`);
  }

  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error(`Incorrect gender ${gender}`);
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error(`Incorrect name ${occupation}`);
  }

  return occupation;
};

const isEntry = (entry: unknown): entry is Entry => {
  if (!entry || typeof entry !== "object") {
    return false;
  }
  if ("type" in entry && typeof (entry as Entry).type === "string") {
    return ["Hospital", "OccupationalHealthcare", "HealthCheck"].includes(
      (entry as Entry).type
    );
  }
  return false;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (Array.isArray(entries)) {
    const validEntries: Entry[] = [];
    const invalidEntries: unknown[] = [];

    entries.forEach((entry) => {
      if (isEntry(entry)) {
        validEntries.push(entry);
      } else {
        invalidEntries.push(entry);
      }
    });

    if (invalidEntries.length > 0) {
      throw new Error(`Incorrect entries: ${invalidEntries.join(", ")}`);
    }

    return validEntries;
  } else {
    throw new Error("Invalid entries format");
  }
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object &&
    "entries" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      // entries: object.entries as Entry[],
      entries: parseEntries(object.entries),
    };

    return newEntry;
  }

  throw new Error("Incorrect data: a field missing");
};

export default toNewPatientEntry;
