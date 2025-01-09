import tryCatchErrorAndSubscribe from '@api/tools/catchAsyncError';
import { from } from 'rxjs';
import express from 'express';
import patient, { PatientInterface } from '@api/models/patient';

export class PatientsService {
  createPatientForProfessional(
    professional: string,
    patientData: Partial<PatientInterface>,
    res: express.Response
  ) {
    tryCatchErrorAndSubscribe<PatientInterface>(
      from(
        patient.create({
          ...patientData,
          birthdate: patientData.birthdate
            ? new Date(patientData.birthdate)
            : null,
          professional,
        })
      ),
      (patient: PatientInterface) => res.status(201).json(patient),
      res,
      'patient created'
    );
  }

  getPatientsByProfessional(
    professional: string,
    res: express.Response,
    page?: number | null,
    pageSize?: number | null
  ) {
    tryCatchErrorAndSubscribe<PatientInterface>(
      from(
        patient
          .find({ professional })
          .limit(pageSize)
          .skip((page - 1) * pageSize)
      ),
      (patients: PatientInterface[]) => res.status(200).json(patients),
      res,
      'patients find'
    );
  }

  getPatientsProfessionalByPhoneIndex(
    phoneindex: string,
    res: express.Response
  ) {
    tryCatchErrorAndSubscribe<PatientInterface>(
      from(patient.find()),
      (patients: PatientInterface[]) => {
        const found: string[] = [];
        patients.forEach((patient) => {
          if (patient.phone.startsWith(phoneindex)) {
            if (
              !found.find(
                (professional) => professional == patient.professional
              )
            ) {
              found.push(patient.professional);
            }
          }
        });
        res.status(200).json(found);
      },
      res,
      'patients find'
    );
  }

  getPatientByIdProfessional(
    professional: string,
    patientId: string,
    res: express.Response
  ) {
    tryCatchErrorAndSubscribe<PatientInterface>(
      from(patient.findOne({ professional, _id: patientId })),
      (patient: PatientInterface) => res.status(200).json(patient),
      res,
      'patient find'
    );
  }
}
