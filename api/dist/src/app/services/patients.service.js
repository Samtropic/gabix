import tryCatchErrorAndSubscribe from '@api/tools/catchAsyncError';
import { from } from 'rxjs';
import patient from '@api/models/patient';
export class PatientsService {
    createPatientForProfessional(professional, patientData, res) {
        tryCatchErrorAndSubscribe(from(patient.create({
            ...patientData,
            birthdate: patientData.birthdate
                ? new Date(patientData.birthdate)
                : null,
            professional,
        })), (patient) => res.status(201).json(patient), res, 'patient created');
    }
    getPatientsByProfessional(professional, res, page, pageSize) {
        tryCatchErrorAndSubscribe(from(patient
            .find({ professional })
            .limit(pageSize)
            .skip((page - 1) * pageSize)), (patients) => res.status(200).json(patients), res, 'patients find');
    }
    getPatientsProfessionalByPhoneIndex(phoneindex, res) {
        tryCatchErrorAndSubscribe(from(patient.find()), (patients) => {
            const found = [];
            patients.forEach((patient) => {
                if (patient.phone.startsWith(phoneindex)) {
                    if (!found.find((professional) => professional == patient.professional)) {
                        found.push(patient.professional);
                    }
                }
            });
            res.status(200).json(found);
        }, res, 'patients find');
    }
    getPatientByIdProfessional(professional, patientId, res) {
        tryCatchErrorAndSubscribe(from(patient.findOne({ professional, _id: patientId })), (patient) => res.status(200).json(patient), res, 'patient find');
    }
}
//# sourceMappingURL=patients.service.js.map