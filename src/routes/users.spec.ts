import { describe, expect, it } from "vitest";
import { dbConnect } from "../dbConnect";
import { i } from "vitest/dist/index-6e18a03a";
const request = require("supertest");
import { app } from "../index";
// const app = require("../index");
describe("Test User Endpoint", () => {
  it("connects service to mongoose", async () => {
    const connect = await dbConnect();
    expect(connect).toBe(true);
  });
  it("tests GET /api/user endpoints", async () => {
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
