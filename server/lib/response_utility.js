const successHandler = (res, url) => {
  return res.status(200).json({
    new_url: url,
  });
};

const errorHandler = (res, err) => {
  return res.status(400).json({
    error: err,
  });
};

module.exports = { successHandler, errorHandler };
