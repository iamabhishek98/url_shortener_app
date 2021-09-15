const Url = require("./models/url");

const findUrlCode = async (urlCode) => {
  return await Url.findOne({ urlCode: urlCode, expired: false });
};

const findOriginalUrl = async (originalUrl) => {
  return await Url.findOne({ originalUrl: originalUrl, expired: false });
};

const insertUrl = async (urlCode, originalUrl) => {
  const newUrl = new Url({ urlCode: urlCode, originalUrl: originalUrl });

  await newUrl.save();
};

const validateUrl = async (urlCode) => {
  const filter = { urlCode: urlCode };
  const update = {
    urlCode: urlCode,
    expired: false,
    lastAccessedAt: new Date().toISOString(),
  };
  return await Url.findOneAndUpdate(filter, update);
};

const invalidateUrl = async (urlCode) => {
  const filter = { urlCode: urlCode };
  const update = { urlCode: urlCode, expired: true };
  return await Url.findOneAndUpdate(filter, update);
};

module.exports = {
  findUrlCode,
  findOriginalUrl,
  insertUrl,
  validateUrl,
  invalidateUrl,
};
