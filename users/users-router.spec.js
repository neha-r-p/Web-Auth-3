const request = require("supertest");
const server = require("../api/server")

describe("users-router.js", () => {
  describe("user router", () => {
    it("should return status 200 from user-router", async () => {
      const expectedStatus = 200;

      const response = await request(server).get("/api/users")

      expect(response.status).toEqual(expectedStatus)
    });
  });
});
