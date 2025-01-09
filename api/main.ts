import http from "http";
// @ts-ignore
import packageJson from "./package.json" assert { type: "json" };
import app from "./src/app/app";
import { fileURLToPath } from "url";

global.__base = fileURLToPath(new URL(".", import.meta.url)); // Works with unix/windows

const server = http.createServer(app); 
const PORT = 4000;

server.listen(PORT, () => {
  console.log(`API version ${packageJson.version}`);
  console.log(`Server listening on ${PORT}`);
});

export default server;
