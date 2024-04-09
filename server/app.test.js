const request = require("supertest");
const app = require("./index");

describe("Test the /login path", () => {
  test("It should respond with 200", async () => {
    const response = await request(app).get("/login");
    expect(response.statusCode).toBe(200);
  });
});

describe("Test the /register path", () => {
  test("It should respond with 200", async () => {
    const response = await request(app).get("/register");
    expect(response.statusCode).toBe(200);
  });
});

describe("Test the /search path", () => {
  test("It should respond with 302", async () => {
    const response = await request(app).get("/search");
    expect(response.statusCode).toBe(302);
    // "temporarily moved to new location - /login"
  });
});

describe("Test that /search is redirected to /login", () => {
  test("It should redirect to /login", async () => {
    const response = await request(app).get("/search");
    expect(response.header.location).toBe("/login");
  });
});

// Test the /search path with authentication
describe("Test the /search path with authentication", () => {
  test("It should respond with 200", async () => {
    const agent = request.agent(app);
    await agent
      .post("/login")
      .send({ email: "evan.harte@keyin.com", password: "keyin" });
    const response = await agent.get("/search");
    expect(response.statusCode).toBe(200);
  });
});
