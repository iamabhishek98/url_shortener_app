const request = require("supertest");
const server = require("../../server.js");
const Url = require("../../db/models/url");
const urlTestData = require("../test_data.js");
const validUrl = require("valid-url");

describe("POST /url", () => {
  beforeEach(async () => {
    await Url.deleteMany({});
    await Url.insertMany(urlTestData);
  });

  afterAll(async () => {
    await Url.deleteMany({});
  });

  describe("valid body", () => {
    it("should return a new shortened url when it does not exist", async () => {
      const validBody = {
        originalUrl: "https://www.youtube.com",
      };
      const res = await request(server).post("/url").send(validBody);

      expect(res.statusCode).toBe(200);
      expect(validUrl.isUri(res.body.url)).toBeTruthy();

      const savedUrls = await Url.find({});
      expect(savedUrls).toHaveLength(4);
    });

    it("should return the existing shortened url when it exists", async () => {
      const validBody = {
        originalUrl: urlTestData[2].originalUrl,
      };
      const res = await request(server).post("/url").send(validBody);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        url: `http://localhost:5000/${urlTestData[2].urlCode}`,
      });

      const savedUrls = await Url.find({});
      expect(savedUrls).toHaveLength(3);
    });
  });

  describe("invalid body", () => {
    it("should throw error when url is missing", async () => {
      const res = await request(server).post("/url").send({});

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ error: "Missing url!" });
    });

    it("should throw error when url is invalid", async () => {
      const invalidBody = {
        originalUrl: "test",
      };
      const res = await request(server).post("/url").send(invalidBody);

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ error: "Invalid url!" });
    });
  });
});
