const request = require("supertest");
const server = require("../api/server")
const db = require('../data/db-config')

describe("users-router.js", () => {
  describe("user router", () => {
    it("should return status 200 from user-router", async () => {
      const expectedStatus = 200;

      const response = await request(server).get("/api/users")

      expect(response.status).toEqual(expectedStatus)
    });

    it("should return a JSON object", async () => {
      let users = await db("users")
      
      const expectedBody = users
      
      const response = await request(server).get("/api/users");
      expect(response.body).toEqual(expectedBody);
    });
  });
});
