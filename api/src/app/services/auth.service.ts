import Professional from "../models/professional";
import compose from "composable-middleware";
import express from "express";
import expressJwt from "express-jwt";
import crypto from "crypto";

const validateJwt = expressJwt({
  secret: "gabix-jwt",
});

export function checkPassword(
  human: { password?: string; salt?: string },
  password: string
) {
  return human.password.trim() === encryptPassword(password.trim(), human.salt);  
}

export function encryptPassword(password?: string, salt?: string): string {
  if (!password || !salt) {
    throw new Error(
      "Unable to encrypt password because it is empty or has no salt"
    );
  }

  const defaultIterations = 50000;
  const defaultKeyLength = 64;
  const saltBuffer = Buffer.from(salt, "base64");

  return crypto
    .pbkdf2Sync(
      password,
      saltBuffer,
      defaultIterations,
      defaultKeyLength,
      "sha1"
    )
    .toString("base64");
}

export function isAuthenticated() {
  return (
    compose()
      // Validate jwt
      .use(function (
        req: express.Request<any, any, any, any>,
        res: express.Response,
        next: express.NextFunction
      ) {
        // allow access_token to be passed through query parameter as well
        // eslint-disable-next-line no-prototype-builtins
        if (req.query && req.query.hasOwnProperty("access_token")) {
          req.headers.authorization = "Bearer " + req.query.access_token;
        }

        validateJwt(req, res, next);
      })
      // Handle errors
      .use(
        (
          err: Error,
          _req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          if (err.name === "UnauthorizedError") {
            return res.status(401).end();
          }

          return next();
        }
      )
      // Load current actor
      .use((req: any, res: express.Response, next: express.NextFunction) => {
        const extendedReq = <any>req;
        Professional.findOne({ _id: req.user._id }).then((professional) => {
          if (!professional) {
            return res.status(500).json({ error: "Professional not found" });
          }

          req.user.email = professional.email;
          req.user.username =
            professional.firstName + " " + professional.lastName;

          // extendedReq.actor = { kind: actorKind, professional: professional };
          return next();
        });
      })
  );
}
