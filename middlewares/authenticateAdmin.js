const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const createError = require('../utils/createError');
const { INVALID_TOKEN, UNAUTHORIZED_ADMIN } = require('../errors');

const authenticateAdmin = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) throw createError(INVALID_TOKEN);

  const token = authHeader.split(' ')[1];
  if (!token) throw createError(INVALID_TOKEN);

  jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) throw createError(UNAUTHORIZED_ADMIN);
    req.user = decoded.user;
    next();
  });
});

module.exports = authenticateAdmin;
