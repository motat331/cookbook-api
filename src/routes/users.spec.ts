import { describe, expect, it } from "vitest";
import supertest from "supertest";
import { app } from "../index";

describe("Test User Endpoint", () => {
  it("tests POST /api/user endpoint", async () => {
    const data = {
      firebase_id: "xSJzkd4sgkVCy5MygaDbDib7CCo1",
      email: "user@user.com",
      first_name: "Vadim",
    };
    const response = await supertest(app).post("/api/user").send(data);
    expect(response.body).toContain({
      firebase_id: "xSJzkd4sgkVCy5MygaDbDib7CCo1",
      email: "user@user.com",
      first_name: "Vadim",
    });
    expect(response.statusCode).toBe(201);
  });
  it("tests GET /api/user endpoint", async () => {
    const response = await supertest(app).get(
      "/api/user/xSJzkd4sgkVCy5MygaDbDib7CCo1"
    );
    expect(response.body).toContain({
      firebase_id: "xSJzkd4sgkVCy5MygaDbDib7CCo1",
      email: "user@user.com",
      first_name: "Vadim",
    });
    expect(response.statusCode).toBe(200);
  });
});
