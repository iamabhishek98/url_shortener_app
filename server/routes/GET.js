const { findUrlCode } = require("../db/queries");
const { errorHandler } = require("../lib/response_utility");

module.exports = ({ server }) => {
  server.get("/:urlCode", async (req, res) => {
    try {
      const { urlCode } = req.params;

      const existingUrlCode = await findUrlCode(urlCode);

      if (existingUrlCode) {
        return res.redirect(existingUrlCode.originalUrl);
      }

      return errorHandler(res, "Url not found!");
    } catch (err) {
      return errorHandler(res, err);
    }
  });
};
