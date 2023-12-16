const asyncHandler = require('express-async-handler');
const moment = require('moment');

const Presence = require('../../models/presence');
const mapPresence = require('../../mapper/mapPresence');

const getPresences = asyncHandler(async (query, pagination) => {
  const {
    page = 1, limit = 10, sortBy = 'createdAt', orderBy = -1
  } = pagination;
  const startOfThisMonth = moment().startOf('month').toDate();
  const endOfThisDay = moment().endOf('day').toDate();
  const { userId, startDate = startOfThisMonth, endDate = endOfThisDay } = query;
  const users = await Presence
    .find({
      userId,
      checkIn: {
        $gte: startDate,
        $lte: endDate
      }
    })
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ [sortBy]: orderBy });

  return users.map(mapPresence);
});

module.exports = getPresences;
