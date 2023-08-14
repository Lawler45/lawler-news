const { allTopics } = require("../models/topics_model");
const db = require("../db/connection");
const data = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const request = require("supertest");
const app = require("../app");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("GET requests", () => {
  test("200: responds with a status 200", () => {
    return request(app).get("/api/topics").expect(200);
  });
  test("200: returns an array of objects with slug and description properties", () => {
    return request(app)
      .get("/api/topics")
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array);
        response.body.forEach((topic) => {
          expect(topic).toHaveProperty("slug", expect.any(String));
          expect(topic).toHaveProperty("description", expect.any(String));
        });
      });
  });
});
