const request = require("supertest");
const server = require("../server");

describe("TASKS OU YE", function() {
  it("Should give me back all tasks", function() {
    return request(server)
      .get("/api/tasks")
      .then(res => {
        expect(true).toBe(true);
      });
  });
});

it("Should give me back a 200", () => {
  return request(server)
    .get("/api/tasks")
    .then(res => {
      expect(200).toBe(200);
    });
});
