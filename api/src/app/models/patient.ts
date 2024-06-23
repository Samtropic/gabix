import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema({
  firstName: { required: true, type: String },
  lastName: { required: true, type: String },
  email: { required: true, type: String, lowercase: true },
  birthdate: { type: Date },
  phone: String,
  professional: { type: mongoose.Schema.Types.ObjectId, ref: 'Professional' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export interface PatientInterface {
  firstName: string;
  lastName: string;
  email: string;
  birthdate: Date;
  phone: string;
  professional: string;
}

export default mongoose.model<any>('Patient', PatientSchema);
