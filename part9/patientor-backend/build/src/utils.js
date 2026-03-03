"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatient = exports.newPatientSchema = void 0;
const zod_1 = require("zod");
const types_1 = require("./types");
exports.newPatientSchema = zod_1.z.object({
    name: zod_1.z.string(),
    dateOfBirth: zod_1.z.iso.date(),
    gender: zod_1.z.enum(types_1.Gender),
    ssn: zod_1.z.string(),
    occupation: zod_1.z.string(),
});
const toNewPatient = (object) => {
    return exports.newPatientSchema.parse(object);
};
exports.toNewPatient = toNewPatient;
