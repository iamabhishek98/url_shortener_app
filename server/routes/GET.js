const { findUrlCode } = require("../db/queries");
const { errorHandler } = require("../lib/response_utility");

module.exports = ({ server }) => {
  server.get("/url/:urlCode", async (req, res) => {
    try {
      const { urlCode } = req.params;

      const existingUrlCode = await findUrlCode(urlCode);

      if (!existingUrlCode) {
        throw "Url not found!";
      }

      return res.redirect(existingUrlCode.originalUrl);
    } catch (err) {
      return errorHandler(res, err);
    }
  });
};
