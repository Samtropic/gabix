import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
  firstName: { required: true, type: String },
  lastName: { required: true, type: String },
  email: { required: true, type: String, lowercase: true },
  birthdate: { required: true, type: Date },
  phone: String,
  professional: { type: mongoose.Schema.Types.ObjectId, ref: "Professional" },
});

export interface PatientInterface {
  firstName: string;
  lastName: string;
  email: string;
  birthdate: Date;
  phone: string,
  professional: string;
}; 

export default mongoose.model<any>("Patient", PatientSchema);
