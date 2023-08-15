"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const parseName = (name) => {
    if (!isString(name)) {
        throw new Error(`Incorrect name ${name}`);
    }
    return name;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDateOfBirth = (date) => {
    if (!isString(date) || !isDate(date)) {
        throw new Error(`Incorrect date ${date}`);
    }
    return date;
};
const parseSsn = (ssn) => {
    if (!isString(ssn)) {
        throw new Error(`Incorrect ssn ${ssn}`);
    }
    return ssn;
};
const isGender = (param) => {
    return Object.values(types_1.Gender)
        .map((v) => v.toString())
        .includes(param);
};
const parseGender = (gender) => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error(`Incorrect gender ${gender}`);
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!isString(occupation)) {
        throw new Error(`Incorrect name ${occupation}`);
    }
    return occupation;
};
const toNewPatientEntry = (object) => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }
    if ("name" in object &&
        "dateOfBirth" in object &&
        "ssn" in object &&
        "gender" in object &&
        "occupation" in object &&
        "entries" in object) {
        const newEntry = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: object.entries,
        };
        return newEntry;
    }
    throw new Error("Incorrect data: a field missing");
};
exports.default = toNewPatientEntry;
