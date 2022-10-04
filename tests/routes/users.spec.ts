import { describe, expect, it } from "vitest";
import supertest from "supertest";
import { app } from "../../src/index";

describe("Test User Endpoint", () => {
  it("tests creating user", async () => {
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
  it("tests proper exception if creating user with duplicate ID", async () => {
    const data = {
      firebase_id: "xSJzkd4sgkVCy5MygaDbDib7CCo1",
      email: "user@user.com",
      first_name: "Vadim",
    };
    const response = await supertest(app).post("/api/user").send(data);
    expect(response.body).toEqual({
      error: true,
      message: "Duplicate unique index passed, check firebase_id, or email",
    });
    expect(response.statusCode).toBe(400);
  });
  it("tests retreiving single user", async () => {
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
