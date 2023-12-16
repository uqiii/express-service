const errorHandler = (err, req, res, next) => {
  if (!err) {
    return next();
  }

  if (!err.status) {
    res.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message
    });
    next();
  }

  res.status(err.status).json({
    code: err.code,
    message: err.message
  });
  return next();
};

module.exports = errorHandler;
