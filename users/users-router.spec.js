const request = require("supertest");
const usersRouter = require("./users-router");

describe("users-router.js", () => {
  describe("user router", () => {
    it("should return status 200 from user-router", async () => {
      const expectedStatus = 200;

      const response = await request(usersRouter).get("/")

      expect(response.status).toEqual(expectedStatus)
    });
  });
});
