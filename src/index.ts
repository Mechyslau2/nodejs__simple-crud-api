import cluster from "cluster";
import "dotenv/config";
//@ts-ignore
import { cpus } from "os";
import { createServer } from "http";
//@ts-ignore
import customRouter from "./router/router.ts";
//@ts-ignore
import { sendResponse } from "./utils/utils.ts";

const PORT = process.env.PORT || 3000;

if (cluster.isPrimary) {
  cpus().forEach((_proc) => {
    cluster.schedulingPolicy = cluster.SCHED_NONE;
    cluster.fork();
  });

  cluster.on("fork", (worker) => {
    console.log(`${worker.id} is running`);
  });

  cluster.on('exit', (worker) => {
    console.log(`The worker ${worker.id} is lost`);
    cluster.fork();
  });
  
} else {
  createServer((req, res) => {
    try {
      const router = customRouter(req.url, req.method);
      if (!router) {
        sendResponse(404, "Page not found", res);
        return;
      }
      if (router && !Object.keys(router).includes(req.method)) {
        sendResponse(404, "This method doesn't exist on the breakpoint", res);
      } else {
        router[req.method](req, res);
      }
    } catch (error) {
      sendResponse(500, "Internal Server error", res);
    }
  }).listen(PORT, () => console.log(`Sever is running on the port: ${PORT}`));
}
