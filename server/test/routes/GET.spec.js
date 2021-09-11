const request = require("supertest");
const server = require("../../server.js");
const Url = require("../../db/models/url");
const urlTestData = require("../test_data.js");

describe("GET /:urlCode", () => {
  beforeAll(async () => {
    await Url.deleteMany({});
    await Url.insertMany(urlTestData);
  });

  afterAll(async () => {
    await Url.deleteMany({});
  });

  describe("valid urlCode", () => {
    it("should return the correct original url", async () => {
      const res = await request(server).get(`/${urlTestData[1].urlCode}`);

      expect(res.statusCode).toBe(302);
      expect(res.text).toEqual(
        `Found. Redirecting to ${urlTestData[1].originalUrl}`
      );
    });
  });

  describe("invalid urlCode", () => {
    it("should throw error when url cannot be found", async () => {
      const res = await request(server).get(`/ancD36DU9`);

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ error: "Url not found!" });
    });
  });
});
