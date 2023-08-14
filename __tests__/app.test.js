const { allTopics } = require("../models/topics_model");
const db = require("../db/connection");
const data = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const request = require("supertest");
const app = require("../app");
const endpointFile = require("../endpoints.json");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("GET api/topics", () => {
  test("200: responds with a status 200", () => {
    return request(app).get("/api/topics").expect(200);
  });
  test("200: returns an array of objects with slug and description properties", () => {
    return request(app)
      .get("/api/topics")
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body).toHaveLength(3);
        response.body.forEach((topic) => {
          expect(topic).toHaveProperty("slug", expect.any(String));
          expect(topic).toHaveProperty("description", expect.any(String));
        });
      });
  });
});

describe("GET api/", () => {
  test("200: responds with a status 200", () => {
    return request(app).get("/api").expect(200);
  });
  test("200: returns an object with keys of endpoints", () => {
    return request(app)
      .get("/api")
      .then((response) => {
        const endPoints = response.body.endPoints;
        const endpointKeys = Object.keys(endPoints);

        expect(endPoints).toEqual(endpointFile);
        expect(endPoints).toBeInstanceOf(Object);
        expect(endpointKeys).toHaveLength(3);
      });
  });
});
