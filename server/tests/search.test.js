const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../index");

const userPayload = {
  id: "user-id",
};

const secret = process.env.JWT_SECRET;

const token = jwt.sign(userPayload, secret, { expiresIn: "1h" });

describe("Test the /search path with authentication to redirect", () => {
  test("It should respond with 302 for authenticated user", async () => {
    const response = await request(app)
      .get("/search")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(302);
  });
});
