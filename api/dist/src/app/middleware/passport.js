import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { checkPassword } from "@api/services/auth.service";
function localAuthenticate(Professional, email, password, done) {
    // Find the professional (must exist)
    Professional.findOne({
        email: email.toLowerCase(),
    })
        .then((professional) => {
        if (!professional) {
            return done(null, false, { message: "INVALID_CREDENTIALS" });
        }
        const authenticated = checkPassword(professional, password);
        if (!authenticated) {
            return done(null, false, { message: "INVALID_CREDENTIALS" });
        }
        return done(null, professional);
    })
        .catch(done);
}
export function setup(Professional) {
    passport.use("localPraticien", new LocalStrategy({
        usernameField: "email",
        passwordField: "password", // this is the virtual field on the model
    }, function (email, password, done) {
        return localAuthenticate(Professional, email, password, done);
    }));
}
//# sourceMappingURL=passport.js.map