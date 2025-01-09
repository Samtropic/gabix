import mongoose from "mongoose";

const CoreSchema = new mongoose.Schema({
  generatedSeed: { type: Boolean, default: false },
});

export default mongoose.model<any>("Core", CoreSchema);
