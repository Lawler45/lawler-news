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

describe("GET api/articles/:articleId", () => {
  test("200: brings the artivle up with the relevant article id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article.title).toEqual("Living in the shadow of a great man");
        expect(article.topic).toEqual("mitch");
        expect(article.author).toEqual("butter_bridge");
        expect(article.body).toEqual("I find this existence challenging");
        expect(article).toHaveProperty("created_at");
        expect(article.votes).toEqual(100);
        expect(article).toHaveProperty("article_img_url");
      });
  });
  test("400: returns a 400 and bad request when passed the wrong data type", () => {
    return request(app)
      .get("/api/articles/lewis")
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toEqual("Bad Request");
      });
  });
  test("404: returns a 404 and not found when there isnt an article id that matches", () => {
    return request(app)
      .get("/api/articles/2000")
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toEqual("Not found");
      });
  });
});

describe("GET: /api/articles", () => {
  test("200: responds with a 200 status and returns all the articles sorted by date in descending order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeSortedBy("created_at", { descending: true });
      });
  });
  test("200: has a property of comment count that counts all the comments related to that article id", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveLength(13);
        body.forEach((article) => {
          expect(article).toHaveProperty("author");
          expect(article).toHaveProperty("title");
          expect(article).toHaveProperty("article_id");
          expect(article).toHaveProperty("topic");
          expect(article).toHaveProperty("created_at");
          expect(article).toHaveProperty("votes");
          expect(article).toHaveProperty("article_img_url");
          expect(article).toHaveProperty("comment_count");
        });
      });
  });
});

describe("GET: /api/articles/:article_id/comments", () => {
  test("200: responds with a 200 status and returns all the comments for the specified article_id and orders with by date, ,most recent first", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toBeSortedBy("created_at", { descending: true });
      });
  });
  test("200: has a property of comment count that counts all the comments related to that article id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toHaveLength(11);
        body.comments.forEach((comment) => {
          expect(comment).toHaveProperty("comment_id");
          expect(comment).toHaveProperty("votes");
          expect(comment).toHaveProperty("created_at");
          expect(comment).toHaveProperty("author");
          expect(comment).toHaveProperty("body");
          expect(comment).toHaveProperty("article_id");
        });
      });
  });
  test("200: returns a 200 and message saying no comments when passed a valid article_id without any comments", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments).toEqual([]);
      });
  });
  test("404: returns a 404 and not found when there isnt an article id that matches", () => {
    return request(app)
      .get("/api/articles/2000/comments")
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toEqual("Not found");
      });
  });
});

describe("POST: /api/articles/:article_id/comments", () => {
  test("201: returns 201 status and the posted comment added to the comments table", () => {
    const newComment = { username: "butter_bridge", body: "Great article" };
    return request(app)
      .post("/api/articles/2/comments")
      .send(newComment)
      .expect(201)
      .then((response) => {
        const { comment } = response.body;
        expect(comment).toHaveProperty("comment_id", expect.any(Number));
        expect(comment).toHaveProperty("body", "Great article");
        expect(comment).toHaveProperty("votes", 0);
        expect(comment).toHaveProperty("author", "butter_bridge");
        expect(comment).toHaveProperty("article_id", 2);
        expect(comment).toHaveProperty("created_at", expect.any(String));
      });
  });
  test("201: returns 201 even if added another parameter", () => {
    const newComment = {
      username: "butter_bridge",
      body: "Great article",
      fruit: "fruit",
    };
    return request(app)
      .post("/api/articles/2/comments")
      .send(newComment)
      .expect(201)
      .then((response) => {
        const { comment } = response.body;
        expect(comment).toHaveProperty("comment_id", expect.any(Number));
        expect(comment).toHaveProperty("body", "Great article");
        expect(comment).toHaveProperty("votes", 0);
        expect(comment).toHaveProperty("author", "butter_bridge");
        expect(comment).toHaveProperty("article_id", 2);
        expect(comment).toHaveProperty("created_at", expect.any(String));
      });
  });
  test("400: returns a 400 and bad request when passed a string for article id", () => {
    const newComment = { username: "butter_bridge", body: "Great article" };
    return request(app)
      .post("/api/articles/orange/comments")
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toEqual("Bad Request");
      });
  });
  test("400: returns a 400 and bad request when theres no body", () => {
    const newComment = { username: "butter_bridge" };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toEqual("Bad Request");
      });
  });
  test("404: returns a 404 and bad request when username doesnt exist", () => {
    const newComment = { username: "lewis", body: 'Great article' };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toEqual("Username doesnt exist");
      });
  });
  test("404: returns a 404 and bad request article id doesnt exist", () => {
    const newComment = { username: "butter_bridge", body: 'Great article' };
    return request(app)
      .post("/api/articles/2000/comments")
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toEqual("Not found");
      });
  });
});

describe('PATCH: /api/articles/:article_id', ()=>{
  test('200: should return with a 200 status and sucessfully update the votes on the selected article',()=>{
    const inc_votes = {inc_votes: 1}
    return request(app)
    .patch('/api/articles/3')
    .send(inc_votes)
    .expect(200)
    .then((response) =>{
      const article = response.body
      expect(article).toHaveProperty("votes", 1);
      expect(article).toHaveProperty("title", expect.any(String));
    })
  })
  test('400: should return 400 status code and bad request when inc_votes is a string', ()=>{
    const inc_votes = {inc_votes: 'banana'}
    return request(app)
    .patch('/api/articles/3')
    .send(inc_votes)
    .expect(400)
    .then(({ body }) => {
      const { msg } = body;
      expect(msg).toEqual("Bad Request");
  })
})
test('400: should return 400 status code and bad request when article_id is a string', ()=>{
  const inc_votes = {inc_votes: 1}
  return request(app)
  .patch('/api/articles/banana')
  .send(inc_votes)
  .expect(400)
  .then(({ body }) => {
    const { msg } = body;
    expect(msg).toEqual("Bad Request");
})
})
test('404: should return 404 status code and not found when article_id doesnt exist', ()=>{
  const inc_votes = {inc_votes: 1}
  return request(app)
  .patch('/api/articles/2000')
  .send(inc_votes)
  .expect(404)
  .then(({ body }) => {
    const { msg } = body;
    expect(msg).toEqual("Not found");
})
})
})

describe("ALL: incorrect path", () => {
  test("when entered a wrong path it should return a 404 error", () => {
    return request(app)
      .get("/api/bananas")
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toEqual("Not Found");
      });
  });
});
