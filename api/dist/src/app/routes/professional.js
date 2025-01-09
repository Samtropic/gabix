import { Router } from 'express';
import { PatientsService } from '@api/services/patients.service';
import { ProfessionalsService } from '@api/services/professional.service';
const router = Router();
router.get('/patients', getPatientsByProfessional);
router.get('/me', getMyProfessional);
router.get('/patients/:patientId', getPatientByIdByProfessional);
router.post('/patients', createPatientForProfessional);
router.put('/me/settings/service/prl', updateMyProfessionalService);
const patientsService = new PatientsService();
const professionalsService = new ProfessionalsService();
export default router;
// -----
// GET
// -----
function getPatientsByProfessional(req, res) {
    const page = req.query.page ? parseInt(req.query.page) : null;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : null;
    patientsService.getPatientsByProfessional(req.user._id, res, page, pageSize);
}
function getPatientByIdByProfessional(req, res) {
    const patientId = req.params.patientId;
    patientsService.getPatientByIdProfessional(req.user._id, patientId, res);
}
function getMyProfessional(req, res) {
    professionalsService.getMyProfessional(req.user._id, res);
}
// -----
// POST
// -----
function createPatientForProfessional(req, res) {
    patientsService.createPatientForProfessional(req.user._id, req.body, res);
}
// -----
// PATCH
// -----
function updateMyProfessionalService(req, res) {
    professionalsService.updateMyProfessionalService(req.user._id, req.body.enabled, res);
}
//# sourceMappingURL=professional.js.map