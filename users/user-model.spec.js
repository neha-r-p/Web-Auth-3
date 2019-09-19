const Users = require("./users-model");
const db = require("../data/db-config.js");



describe("user model", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  it("should set environment to testing", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("add()", () => {
    it("should add user into the db", async () => {
      await Users.add({
        username: "im",
        password: "so",
        department: "tired"
      });

      let users = await db("users");

      expect(users).toHaveLength(1);
    });

    it("should insert users into the db", async () => {
      const { id } = await Users.add({
        username: "im",
        password: "so",
        department: "sleepy"
      });

      let user = await db("users")
        .where({ id })
        .first();

      expect(user.username).toBe("im");
    });

    it("should delete user from db", async () => {
      const { id } = await Users.remove({username: "im",
      password: "so",
      department: "sleepy"})

      let users = await db("users")
      expect(users).toHaveLength(0)
    })

  })
});
