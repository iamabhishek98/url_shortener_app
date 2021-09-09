const validUrl = require("valid-url");
const shortid = require("shortid");
const { successHandler, errorHandler } = require("../lib/response_utility");
const { findOriginalUrl, insertUrl } = require("../db/queries");

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

module.exports = ({ server }) => {
  server.post("/", async (req, res) => {
    try {
      const { originalUrl } = req.body;

      if (!originalUrl) {
        throw "Missing url!";
      }

      if (!validUrl.isUri(originalUrl)) {
        throw "Invalid url!";
      }

      const existingUrl = await findOriginalUrl(originalUrl);

      if (existingUrl) {
        const existingShortenedUrl = `${BASE_URL}/${existingUrl.urlCode}`;
        return successHandler(res, existingShortenedUrl);
      }

      const newUrlCode = shortid.generate();
      await insertUrl(newUrlCode, originalUrl);

      const newShortenedUrl = `${BASE_URL}/${newUrlCode}`;
      return successHandler(res, newShortenedUrl);
    } catch (err) {
      return errorHandler(res, err);
    }
  });
};
