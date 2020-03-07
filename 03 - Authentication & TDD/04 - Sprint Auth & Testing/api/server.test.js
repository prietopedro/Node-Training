const sever = require('./server')
const testing = require('supertest')

describe("server",()=>{
    it("should be in testing mode",()=>{
        expect(process.env.DB_ENV).toBe("testing")
    })
})