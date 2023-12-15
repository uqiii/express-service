const createError = require('../utils/createError');
const { UNAUTHORIZED } = require('../errors');

const authenticateApiKey = (req, res, next) => {
  const headerApiKey = req.headers['api-key'];
  if (headerApiKey !== process.env.API_KEY) {
    throw createError(UNAUTHORIZED);
  }

  return next();
};

module.exports = authenticateApiKey;
