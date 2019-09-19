const request = require("supertest");

const auth = require("./auth-router");

describe("auth-router.js", () => {
  describe("auth route", () => {
    it("should return status 201 from auth register route", async () => {
      const expectedStatus = 201;

      const response = await request(auth)
        .post("/auth/register")
        .send({ username: "hi", password: "bye", department: "whatsup" });
        
      expect(response.status).toBe(expectedStatus);
    });
  });
});
