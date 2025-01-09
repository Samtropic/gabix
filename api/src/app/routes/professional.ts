import { Router } from "express";
import express from "express";
import { PatientsService } from "@api/services/patients.service";
import { ProfessionalsService } from "@api/services/professional.service";

const router = Router();

router.get("/patients", getPatientsByProfessional);
router.get("/me", getMyProfessional);
router.put("/me/settings/service/prl", updateMyProfessionalService);
const patientsService = new PatientsService();
const professionalsService = new ProfessionalsService();
export default router;

// -----
// GET
// -----

function getPatientsByProfessional(req: any, res: express.Response) {
  patientsService.getPatientsByProfessional(req.user._id, res);
}

function getMyProfessional(req: any, res: express.Response) {
  professionalsService.getMyProfessional(req.user._id, res);
}


// -----
// PATCH
// -----

function updateMyProfessionalService(req: any, res: express.Response) {
  professionalsService.updateMyProfessionalService(
    req.user._id,
    req.body.enabled,
    res
  );
}