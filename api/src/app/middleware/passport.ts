import mongoose from "mongoose";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { checkPassword } from "@api/services/auth.service";

function localAuthenticate(
  Professional: mongoose.Model<any>,
  email: string,
  password: string,
  done: any
) {
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

export function setup(Professional: mongoose.Model<any>) {
  passport.use(
    "localPraticien",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password", // this is the virtual field on the model
      },
      function (email: string, password: string, done: any) {
        return localAuthenticate(Professional, email, password, done);
      }
    )
  );
}
