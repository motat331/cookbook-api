import { describe, expect, it } from "vitest";
import supertest from "supertest";
import { app } from "../../src/index";
import { dbConnect, connected } from "../../src/dbConnect";

let TEST_RECIPE_ID = "";
const TEST_RECIPE_DATA = {
  name: "Chicken & Steak Kabobs",
  image:
    "https://firebasestorage.googleapis.com/v0/b/cookbook-staging-1cc4b.appspot.com/o/1664415188084.jpg?alt=media&token=7c92f057-4f4f-496c-aa06-f4f37a6ee19a",
  ingredients: [
    {
      id: "1",
      name: "Tomato",
      unit: "2x",
    },
    {
      id: "2",
      name: "Chicken Breast",
      unit: "2x",
    },
  ],
  instructions: "Testdda\n\nGds",
};

describe("Test User Endpoint", async () => {
  if (!connected) await dbConnect();
  it("tests creating recipe", async () => {
    const response = await supertest(app)
      .post("/api/recipe")
      .send(TEST_RECIPE_DATA);
    TEST_RECIPE_ID = response.body._id;
    expect(response.statusCode).toBe(201);
  });
  it("tests retreiving single recipe", async () => {
    const response = await supertest(app).get(`/api/recipe/${TEST_RECIPE_ID}`);
    expect(response.statusCode).toBe(200);
  });
  it("tests deleting recipe", async () => {
    const response = await supertest(app).delete(
      `/api/recipe/${TEST_RECIPE_ID}`
    );
    expect(response.statusCode).toBe(200);
  });
});
