import tryCatchErrorAndSubscribe from '@api/tools/catchAsyncError';
import { from } from 'rxjs';
import professional from '@api/models/professional';
export class ProfessionalsService {
    getMyProfessional(_id, res) {
        tryCatchErrorAndSubscribe(from(professional.findOne({ _id }).populate({
            path: 'mainExpertize',
        })), (professional) => res.status(200).json(professional), res, 'Professional findOne');
    }
    getProfessionalsByExpertize(expertizeLabelUnknown, name, res) {
        tryCatchErrorAndSubscribe(from(professional
            .aggregate([
            {
                $match: {
                    // Exclude disabled prl service
                    'services.prl.enabled': { $ne: false },
                },
            },
            {
                $lookup: {
                    from: 'expertizes',
                    localField: 'mainExpertize',
                    foreignField: '_id',
                    as: 'mainExpertiseLabel',
                },
            },
            {
                $match: {
                    // Filter professionals with matching expertise and partial lastName or firstName
                    'mainExpertiseLabel.label.unknown': expertizeLabelUnknown,
                    $or: [
                        { lastName: { $regex: `^${name}.*`, $options: 'i' } },
                        { firstName: { $regex: `^${name}.*`, $options: 'i' } },
                    ],
                },
            },
        ])
            .limit(5)), (professionals) => res.status(200).json(professionals), res, 'Professionals find ');
    }
    updateMyProfessionalService(_id, prlEnabled, res) {
        tryCatchErrorAndSubscribe(from(professional
            .findOneAndUpdate({ _id }, {
            $set: { 'services.prl.enabled': prlEnabled },
        })
            .populate({
            path: 'mainExpertize',
        })), (professional) => res.status(200).json(professional), res, 'Professional findOneAndUpdate');
    }
}
//# sourceMappingURL=professional.service.js.map