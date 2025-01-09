import { Router } from "express";
import express from "express";
import { loginLocalPro } from "../controllers/auth";
import { ExpertizesService } from "@api/services/expertizes.service";

const router = Router();

router.get("/expertizes", getExpertizes);
router.post("/professionals/login", loginLocalPro);
const expertizesService = new ExpertizesService();
export default router;

// -----
// GET
// -----

function getExpertizes(req: any, res: express.Response) {
  expertizesService.getExpertizes(res);
}