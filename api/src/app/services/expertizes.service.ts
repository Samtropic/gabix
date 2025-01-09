import tryCatchErrorAndSubscribe from "@api/tools/catchAsyncError";
import Expertize, { ExpertizeInterface } from "../models/expertize";
import { from } from "rxjs";
import express from "express";

export class ExpertizesService {

    getExpertizes(res: express.Response){
        tryCatchErrorAndSubscribe<ExpertizeInterface>(
            from(Expertize.find({}, {_id: 0})),
            (expertizes: ExpertizeInterface[]) => res.status(200).json(expertizes),
            res,
            "find expertizes"
          );
    }
}