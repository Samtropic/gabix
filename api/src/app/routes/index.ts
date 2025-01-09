/**
 * Main application routes
 */

import express from "express";
// @ts-ignore
import packageJson from "../../../package.json" assert { type: "json" };

//import * as SeedHelper from '../seed';
import proRouter from "./professional";
import anonymousRouter from "./anonymous";
import { isAuthenticated } from "../services/auth.service";

export default function (app: express.Express) {
  app.get("/status", (_req: express.Request, res: express.Response) => {
    res.status(200).send(packageJson.version);
  });
  app.use("/pro", isAuthenticated(), proRouter);
  app.use("/anonymous", anonymousRouter);
}
