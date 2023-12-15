const httpError = require('http-errors');

const createError = (errorCode) => {
  const { message, code, status } = errorCode;

  return httpError(
    status,
    message,
    { code, message }
  );
};

module.exports = createError;
