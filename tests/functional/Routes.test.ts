import request from "supertest";

import server, { app } from "../../src/app";

afterAll(async () => {
  await server.close(); // CLOSE THE SERVER CONNECTION
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500)); // PLUS THE HACK PROVIDED BY @yss14
});

describe("Route Test", () => {
  it("/convert with invalid content-type in header", async () => {
    const response = await request(app)
      .post("/convert")
      .set("content-type", "application/json");

    expect(response.statusCode).toBe(415);
    expect(response.text).toBe('{"error":"Invalid header: wrong content-type."}');
  });
});
