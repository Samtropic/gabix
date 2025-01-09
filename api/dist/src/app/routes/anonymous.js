import { Router } from 'express';
import { loginLocalPro } from '../controllers/auth';
import { ExpertizesService } from '@api/services/expertizes.service';
import { ProfessionalsService } from '@api/services/professional.service';
const router = Router();
router.get('/expertizes', getExpertizes);
router.get('/professionals', getProfessionalsByExpertize);
router.post('/professionals/login', loginLocalPro);
const expertizesService = new ExpertizesService();
const professionalsService = new ProfessionalsService();
export default router;
// -----
// GET
// -----
function getExpertizes(req, res) {
    expertizesService.getExpertizes(res);
}
/**
 * @description: Retrieve all prl.enabled professionals that match the expertize's label.unknow and
 *  having lastName or firstName partially matching (case insensitive) a query parameter search string
 * @param req
 * @param res
 */
function getProfessionalsByExpertize(req, res) {
    const expertizeLabelUnknow = decodeURIComponent(req.query.expertizeLabelUnknow);
    const namePartialSearchString = decodeURIComponent(req.query.name);
    professionalsService.getProfessionalsByExpertize(expertizeLabelUnknow, namePartialSearchString, res);
}
//# sourceMappingURL=anonymous.js.map