const Url = require("./models/url");

const findUrlCode = async (urlCode) => {
  return await Url.findOne({ urlCode: urlCode });
};

const findOriginalUrl = async (originalUrl) => {
  return await Url.findOne({ originalUrl: originalUrl });
};

const insertUrl = async (urlCode, originalUrl) => {
  const newUrl = new Url({ urlCode: urlCode, originalUrl: originalUrl });

  await newUrl.save();
};

module.exports = { findUrlCode, findOriginalUrl, insertUrl };
