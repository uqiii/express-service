const asyncHandler = require('express-async-handler');

const Presence = require('../../models/presence');
const mapPresence = require('../../mapper/mapPresence');

const getPresences = asyncHandler(async (query, pagination) => {
  const { limit = 10, page = 1 } = pagination;
  const users = await Presence
    .find(query)
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  return users.map(mapPresence);
});

module.exports = getPresences;
