"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = require("../utils");
const zod_1 = require("zod");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    const patients = patientService_1.default.getEntries();
    res.json(patients);
});
const newPatientParser = (req, _res, next) => {
    try {
        utils_1.newPatientSchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
const errorMiddleware = (error, _req, res, next) => {
    if (error instanceof zod_1.ZodError) {
        res.status(400).send({ error: error.issues });
    }
    else {
        next(error);
    }
};
router.post('/', newPatientParser, (req, res) => {
    const newEntry = patientService_1.default.addEntry(req.body);
    res.json(newEntry);
});
router.use(errorMiddleware);
exports.default = router;
