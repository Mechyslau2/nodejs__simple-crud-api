import { createServer } from "http";
import "dotenv/config";
//@ts-ignore
import customRouter from "./router/router.ts";
//@ts-ignore
import { sendResponse } from "./utils/utils.ts";
const PORT = process.env.PORT || 3000;

const server = createServer((req, res) => {
  try {
    const router = customRouter(req.url, req.method);
    if (!router) {
        sendResponse(404, 'Page not found', res);
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
});

server.listen(PORT, () => console.log(`Sever is running on the port: ${PORT}`));
