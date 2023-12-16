const asyncHandler = require('express-async-handler');
const moment = require('moment');

const Presence = require('../../models/presence');
const mapPresence = require('../../mapper/mapPresence');

const getPresences = asyncHandler(async (query, pagination) => {
  const {
    page, limit, sortBy, orderBy
  } = pagination;
  const { userId, startDate, endDate } = query;

  const presences = await Presence
    .find({
      userId,
      checkIn: {
        $gte: startDate ? moment(startDate).toDate() : moment().startOf('month').toDate(),
        $lte: endDate ? moment(endDate).toDate() : moment().endOf('day').toDate()
      }
    })
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ [sortBy]: orderBy });

  return presences.map(mapPresence);
});

module.exports = getPresences;
