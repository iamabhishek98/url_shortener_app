const request = require("supertest");
const server = require("../server.js");
const Url = require("../db/models/url");
const urls = require("./test_data.js");

describe("GET /url/:urlCode", () => {
  beforeAll(async () => {
    await Url.deleteMany({});
    await Url.insertMany(urls);
  });

  afterAll(async () => {
    await Url.deleteMany({});
  });

  it("should return the correct original url", async () => {
    const res = await request(server).get(`/url/${urls[1].urlCode}`);

    expect(res.statusCode).toBe(302);
    expect(res.text).toEqual(`Found. Redirecting to ${urls[1].originalUrl}`);
  });

  it("should throw error when url cannot be found", async () => {
    const res = await request(server).get(`/url/ancD36DU9`);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: "Url not found!" });
  });
});
