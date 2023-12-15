const errorHandler = (err, req, res, next) => {
  if (!err) {
    return next();
  }

  console.log('===error : ', err);
  res.status(err.status).json({
    code: err.code,
    message: err.message
  });
  return next();
};

module.exports = errorHandler;
