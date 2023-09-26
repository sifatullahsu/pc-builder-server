const errorHandler = (err, req, res, next) => {
  res.send({
    status: false,
    error: err.message,
  });
};

module.exports = errorHandler;
