import { describe, expect, it } from "vitest";
import supertest from "supertest";
import { app } from "../../src/index";

let TEST_USER_ID = "";
let TEST_USER_DATA = {
  firebase_id: "testuser_firebaseid",
  email: "test@test.com",
  first_name: "Vadim",
};

describe("Test User Endpoint", () => {
  it("tests creating user", async () => {
    const response = await supertest(app)
      .post("/api/user")
      .send(TEST_USER_DATA);
    TEST_USER_ID = response.body._id;
    expect(response.body).toContain(TEST_USER_DATA);
    expect(response.statusCode).toBe(201);
  });
  it("tests proper exception if creating user with duplicate ID", async () => {
    const response = await supertest(app)
      .post("/api/user")
      .send(TEST_USER_DATA);
    expect(response.body).toEqual({
      error: true,
      message: "Duplicate unique index passed, check firebase_id, or email",
    });
    expect(response.statusCode).toBe(400);
  });
  it("tests retreiving single user", async () => {
    const response = await supertest(app).get(`/api/user/testuser_firebaseid`);
    expect(response.body).toContain(TEST_USER_DATA);
    expect(response.statusCode).toBe(200);
  });
  it("tests deleting user", async () => {
    const response = await supertest(app).delete(`/api/user/${TEST_USER_ID}`);
    expect(response.statusCode).toBe(200);
  });
});
