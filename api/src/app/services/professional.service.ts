import tryCatchErrorAndSubscribe from "@api/tools/catchAsyncError";
import { from } from "rxjs";
import express from "express";
import professional, { ProfessionalInterface } from "@api/models/professional";

export class ProfessionalsService {
  getMyProfessional(_id, res: express.Response) {
    tryCatchErrorAndSubscribe<ProfessionalInterface>(
      from(
        professional.findOne({ _id }).populate({
          path: "mainExpertize",
        })
      ),
      (professional: ProfessionalInterface) =>
        res.status(200).json(professional),
      res,
      "Professional findOne"
    );
  }

  updateMyProfessionalService(_id: string, prlEnabled: boolean, res: express.Response) {
    tryCatchErrorAndSubscribe<ProfessionalInterface>(
      from(
        professional
          .findOneAndUpdate(
            { _id },
            {
              $set: { "services.prl.enabled": prlEnabled },
            }
          )
          .populate({
            path: "mainExpertize",
          })
      ),
      (professional: ProfessionalInterface) =>
        res.status(200).json(professional),
      res,
      "Professional findOneAndUpdate"
    );
  }
}
