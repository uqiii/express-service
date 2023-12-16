const asyncHandler = require('express-async-handler');

const Presence = require('../../models/presence');
const mapPresence = require('../../mapper/mapPresence');

const getPresences = asyncHandler(async (query) => {
  const users = await Presence.find(query);

  return users.map(mapPresence);
});

module.exports = getPresences;
