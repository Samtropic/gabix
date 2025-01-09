import passport from "passport";
import jwt from "jsonwebtoken";
import { setup as proLocalSetup } from "../middleware/passport";
import Professional from "@api/models/professional";
proLocalSetup(Professional);
// For professionals and (cabinet) secretaries
export function loginLocalPro(req, res, next) {
    passport.authenticate("localPraticien", async (err, user, info) => {
        const error = err || info;
        if (error) {
            return res.status(401).json(error);
        }
        if (!user) {
            return res
                .status(404)
                .json({ message: "Something went wrong, please try again." });
        }
        // const tokenEntry = await saveToken(user._id, 'professional', false);
        const token = jwt.sign({ _id: user._id }, "gabix-jwt", {
            expiresIn: "30d",
        });
        // signToken(user._id, tokenEntry._id);e
        const userPro = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            picture: user.picture,
            email: user.email,
            country: user.country,
            timezone: user.timezone,
            params: user.params,
            services: user.services,
        };
        return res.status(200).json({ token, impersonate: false, user: userPro });
    })(req, res, next);
}
//# sourceMappingURL=auth.js.map