import tryCatchErrorAndSubscribe from "@api/tools/catchAsyncError";
import { from } from "rxjs";
import express from "express";
import patient, { PatientInterface } from "@api/models/patient";

export class PatientsService {
  getPatientsByProfessional(professional: string, res: express.Response) {
    tryCatchErrorAndSubscribe<PatientInterface>(
      from(patient.find({ professional })),
      (patients: PatientInterface[]) => res.status(200).json(patients),
      res,
      "patients find"
    );
  }

  getPatientsProfessionalByPhoneIndex(phoneindex: string, res: express.Response) {
    tryCatchErrorAndSubscribe<PatientInterface>(
      from(patient.find()),
      (patients: PatientInterface[]) => {
        const found: string[] = [];
        patients.forEach((patient) => {
          if (patient.phone.startsWith(phoneindex)) {
            if (!found.find(professional => professional == patient.professional)){
              found.push(patient.professional);
            }
          }
        })
        res.status(200).json(found)},
      res,
      "patients find"
    );
  }
}
