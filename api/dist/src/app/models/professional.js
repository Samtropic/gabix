import mongoose from 'mongoose';
import crypto from 'crypto';
import { encryptPassword } from '@api/services/auth.service';
const ProfessionalSchema = new mongoose.Schema({
    firstName: { required: true, type: String, index: 'text' },
    lastName: { required: true, type: String, index: 'text' },
    email: { required: true, type: String, lowercase: true },
    birthdate: { required: true, type: Date },
    services: {
        prl: {
            // Prl = Prise Rendez-vous en Ligne
            enabled: { type: Boolean, default: false },
        },
    },
    password: {
        type: String,
        required: true,
    },
    salt: String,
    mainExpertize: { type: mongoose.Schema.Types.ObjectId, ref: 'Expertize' },
    phone: String,
    about: String,
    address: {
        city: String,
        country: String,
    },
    isConfirmed: {
        email: { type: Boolean, default: false },
    },
}, { timestamps: true });
ProfessionalSchema.pre('validate', function (next) {
    // Handle new/update passwords
    if (!this.isModified('password')) {
        return next();
    }
    if (!this.password || !this.password.length) {
        return next(new Error('Invalid password'));
    }
    // Refresh the salt
    this.salt = crypto.randomBytes(16).toString('base64');
    // Save the encrypted version of the password
    this.password = encryptPassword(this.password, this.salt);
    next();
});
ProfessionalSchema.index({ lastName: 'text', firstName: 'text' }, { name: 'lastName_firstName_text_index' });
export default mongoose.model('Professional', ProfessionalSchema);
//# sourceMappingURL=professional.js.map