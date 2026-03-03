"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../../data/patients"));
const utils_1 = require("../utils");
const data = patients_1.default.map(obj => {
    const patient = (0, utils_1.toNewPatient)(obj);
    patient.id = obj.id;
    return patient;
});
const getEntries = () => {
    return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};
const addEntry = (entry) => {
    const patient = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    data.push(patient);
    const { id, name, dateOfBirth, gender, occupation } = patient;
    return { id, name, dateOfBirth, gender, occupation };
};
exports.default = {
    getEntries,
    addEntry,
};
