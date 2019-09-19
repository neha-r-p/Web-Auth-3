
const Users = require("../users/users-model");
const db = require("../data/db-config.js");

describe('auth router', () => {
    beforeEach( async () => {
        await db('users').truncate();
    })

    it('should set environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })
})