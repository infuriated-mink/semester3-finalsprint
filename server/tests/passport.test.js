const JwtStrategy = require("passport-jwt").Strategy;
const app = require("../index.js");

// Mock the users array
const users = [{ id: "1", username: "test", password: "test" }];

// Require and initialize passport with the users array
const passport = require("../passport")(users);

jest.mock("passport-jwt", () => ({
  Strategy: jest.fn().mockImplementation(function () {
    this.name = "jwt";
  }),
  ExtractJwt: {
    fromAuthHeaderAsBearerToken: jest.fn(),
  },
}));

describe("JWT Strategy", () => {
  it("should return user if user exists", () => {
    const [[opts, callback]] = JwtStrategy.mock.calls;

    const jwt_payload = { id: "1" };
    const done = jest.fn();

    callback(jwt_payload, done);

    expect(done).toHaveBeenCalledWith(null, users[0]);
  });

  it("should return false if user does not exist", () => {
    const [[opts, callback]] = JwtStrategy.mock.calls;

    const jwt_payload = { id: "2" };
    const done = jest.fn();

    callback(jwt_payload, done);

    expect(done).toHaveBeenCalledWith(null, false);
  });
});
