/* eslint-disable quote-props */
import fs from "fs";
import { Request } from "jest-express/lib/request";
import { Response } from "jest-express/lib/response";

import { MarkdownConvertorController } from "../../src/controllers/MarkdownConvertorController";

const filePath = "./tests/data/test.md";
const testData = fs.readFileSync(filePath, { encoding: "utf8" });
const resultFilePath = "./tests/data/result.html";
const testResult = fs.readFileSync(resultFilePath, { encoding: "utf8" });

jest.mock("express", () => {
  return require("jest-express");
});

let res;

describe("MarkDownConvertorController", () => {
  beforeEach(() => {
    res = new Response();
  });

  afterEach(() => {
    res.resetMocked();
  });

  it("should convert markdown to html", async () => {
    const req: any = new Request("/convert", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain"
      }
    });
    req.setBody(testData);

    const controller = new MarkdownConvertorController();

    await controller.convert(req, res);
    expect(res.statusCode).toBe(201);
    expect(res.body).toBe(testResult);
  });

  describe("failures", () => {
    it("should return 400 when body is missing", async () => {
      const req: any = new Request("/convert", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain"
        }
      });

      const controller = new MarkdownConvertorController();

      await controller.convert(req, res);
      expect(res.statusCode).toBe(400);
      expect(res.body).toStrictEqual({ "error": "Request is missing a body." });
    });

    it("should return 415 for wrong content-type in header", async () => {
      const req: any = new Request("/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
      req.setBody(testData);

      const controller = new MarkdownConvertorController();

      await controller.convert(req, res);
      expect(res.statusCode).toBe(415);
      expect(res.body).toStrictEqual({ "error": "Invalid header: wrong content-type." });
    });
  });
});
