import bodyParser from "body-parser";
import dotenv from "dotenv";
import express, { Application } from "express";
import morgan from "morgan";

import { MarkdownConvertorController } from "./controllers/MarkdownConvertorController";

// initialize configuration
dotenv.config();

const app: Application = express();
const port = process.env.SERVER_PORT;

// Middleware
app.use(bodyParser.text({ limit: "10mb", type: "text/plain" }));
/* istanbul ignore next */
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const markdownConvertorController = new MarkdownConvertorController();

app.post(
  "/convert",
  markdownConvertorController.convert.bind(markdownConvertorController)
);

let server: any = null;

try {
  server = app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });
} catch (error: any) /* istanbul ignore next */ {
  console.error(`Error occured: ${error.message}`);
}

export { app };
export default server;
