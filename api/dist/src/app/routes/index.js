/**
 * Main application routes
 */
// @ts-ignore
import packageJson from "../../../package.json" assert { type: "json" };
//import * as SeedHelper from '../seed';
import proRouter from "./professional";
import anonymousRouter from "./anonymous";
import { isAuthenticated } from "../services/auth.service";
export default function (app) {
    app.get("/status", (_req, res) => {
        res.status(200).send(packageJson.version);
    });
    app.use("/pro", isAuthenticated(), proRouter);
    app.use("/anonymous", anonymousRouter);
}
//# sourceMappingURL=index.js.map