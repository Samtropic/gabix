import mongoose from "mongoose";

const ExpertizeSchema = new mongoose.Schema({
  label: {
    female: { type: String, required: true },
    male: { type: String, required: true },
    unknown: { type: String, required: true },
  },
});

export interface ExpertizeInterface {
  label: {
    female: string;
    male: string;
    unknown: string;
  },
};


const ExpertizeModel = mongoose.model<any>("Expertize", ExpertizeSchema);
export default ExpertizeModel;
