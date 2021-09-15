const { findUrlCode, validateUrl, invalidateUrl } = require("../db/queries");
const { errorHandler } = require("../lib/response_utility");

module.exports = ({ server }) => {
  server.get("/:urlCode", async (req, res) => {
    try {
      const { urlCode } = req.params;

      const existingUrlCode = await findUrlCode(urlCode);

      if (!existingUrlCode) {
        throw "Url not found!";
      }

      if (existingUrlCode.expired) {
        throw "Url not valid!";
      }
      if (
        new Date().getTime() -
          new Date(existingUrlCode.lastAccessedAt).getTime() >
        10000
      ) {
        await invalidateUrl(existingUrlCode.urlCode);
        throw "Url has expired";
      }

      await validateUrl(existingUrlCode.urlCode);

      return res.redirect(existingUrlCode.originalUrl);
    } catch (err) {
      return errorHandler(res, err);
    }
  });
};
