// File: src/tests/user.test.ts
import request from "supertest";
import app from "../index";

describe("User API", () => {
  it("should return an empty list of users", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("should create a new user", async () => {
    const user = { name: "John Doe", email: "john.doe@example.com" };
    const res = await request(app).post("/users").send(user);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(user.name);
    expect(res.body.email).toBe(user.email);
  });
});
