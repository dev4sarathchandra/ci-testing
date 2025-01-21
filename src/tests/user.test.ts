import request from "supertest";
import app from "../index";

describe("User API", () => {
  let userId: number | undefined;

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
    userId = res.body.id; // Store the user ID for deletion in the next test
  });

  it("should delete the user", async () => {
    if (!userId) {
      throw new Error("User ID is undefined. Make sure a user is created first.");
    }
    const res = await request(app).delete(`/users/${userId}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("John Doe");
    expect(res.body.email).toBe("john.doe@example.com");
    const nonExistentUserId = 9999; // Assuming 9999 is a non-existent user ID
    const resp = await request(app).delete(`/users/${nonExistentUserId}`);
    expect(resp.status).toBe(404);
    expect(resp.body).toEqual({ error: "User not found" });
  });

});
