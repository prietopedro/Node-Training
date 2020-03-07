const server = require("../api/server");
const request = require("supertest");
const db = require("../database/dbConfig");

describe("DB", function() {
  beforeEach(async () => {
    await db("users").truncate();
  });
  describe("POST NEW USER", () => {
    it("Should Be A Teapot", () => {
      return request(server)
        .post("/api/auth/register")
        .send({ notAUserName: "Hello" })
        .then(res => {
          expect(res.status).toBe(418);
        });
    });
    it("Should Be Successful", () => {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "Hello5", password: "YoooHello5" })
        .set("Accept", "application/json")
        .then(res => {
          expect(res.body.username).toBe("Hello5");
          return request(server)
            .post("/api/auth/login")
            .send({ username: "Hello5", password: "YoooHello5" })
            .then(res => {
              const token = res.body.token;
              expect(res.status).toBe(200);
              return request(server)
                .get("/api/jokes")
                .set("Authorization", token)
                .then(res => {
                  expect(res.status).toBe(200);
                });
            });
        });
    });
  });
  describe("LOGIN", () => {
    it("Should get a 401 error", () => {
      return request(server)
        .post("/api/auth/login")
        .send({ notAUserName: "Hello" })
        .then(res => {
          expect(res.status).toBe(401);
        });
    });
    describe("JOKES AUTH FAILURE",()=>{
        it("SHOULD BE STATUS 401",()=>{
            return request(server)
                .get('/api/jokes')
                .then(res=>{
                    expect(res.status).toBe(401)
                })
        })
    })
  });
});
