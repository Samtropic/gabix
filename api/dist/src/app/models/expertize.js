import mongoose from "mongoose";
const ExpertizeSchema = new mongoose.Schema({
    label: {
        female: { type: String, required: true },
        male: { type: String, required: true },
        unknown: { type: String, required: true },
    },
});
;
const ExpertizeModel = mongoose.model("Expertize", ExpertizeSchema);
export default ExpertizeModel;
//# sourceMappingURL=expertize.js.map