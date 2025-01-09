import tryCatchErrorAndSubscribe from "@api/tools/catchAsyncError";
import Expertize from "../models/expertize";
import { from } from "rxjs";
export class ExpertizesService {
    getExpertizes(res) {
        tryCatchErrorAndSubscribe(from(Expertize.find({}, { _id: 0 })), (expertizes) => res.status(200).json(expertizes), res, "find expertizes");
    }
}
//# sourceMappingURL=expertizes.service.js.map