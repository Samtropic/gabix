import { EventEmitter } from "events";

import cors from "cors";
import express from "express";
import morgan from "morgan";

import routeSetup from "../routes";

const LONG_STACK_TRESHOLD = 3000;

export default function (app: express.Express) {
  app.use(express.urlencoded({ extended: false }));
  app.use(
    cors({
      exposedHeaders: ["X-Docorga-APP-Version-Validation"],
    })
  );

  app.use(express.json());

  app.use(
    morgan(
      "[:date[clf]] :remote-addr :method :url :status :response-time ms - :res[content-length]"
    )
  );

  const profiles = new EventEmitter();
  app.use(function profilerMiddleware(req, res, next) {
    const start = Date.now();
    res.once("finish", () => {
      profiles.emit("route", { req, elapsedMS: Date.now() - start });
    });

    next();
  });

  // Configure express router
  routeSetup(app);
}
