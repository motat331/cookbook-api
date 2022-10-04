import { describe, expect, it } from "vitest";
const request = require("supertest");
import { app } from "../index";
// const app = require("../index");
describe("Test User Endpoint", () => {
  it("tests GET /api/user endpoint", async () => {
    expect(true).toEqual(true);
    const response = await request(app).get(
      "/api/user/xSJzkd4sgkVCy5MygaDbDib7CCo1"
    );
    expect(response.body).toEqual({
      _id: "632a3986939329bde8ea9eae",
      firebase_id: "xSJzkd4sgkVCy5MygaDbDib7CCo1",
      email: "user@user.com",
      first_name: "Vadim",
      __v: 0,
    });
    expect(response.statusCode).toBe(200);
  });
});
