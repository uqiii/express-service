const asyncHandler = require('express-async-handler');
const moment = require('moment');

const createError = require('../../utils/createError');
const Presence = require('../../models/presence');
const { USER_ALREADY_CHECKED_IN, USER_ALREADY_CHECKED_OUT, USER_HAS_NOT_CHECKED_IN } = require('../../errors');
const mapPresence = require('../../mapper/mapPresence');

const handleCheckIn = (userId, userTodayPresence) => {
  if (userTodayPresence) throw createError(USER_ALREADY_CHECKED_IN);

  return Presence.create({
    userId,
    checkIn: new Date()
  });
};

const handleCheckOut = (userTodayPresence) => {
  if (!userTodayPresence) throw createError(USER_HAS_NOT_CHECKED_IN);

  if (userTodayPresence.checkOut) throw createError(USER_ALREADY_CHECKED_OUT);

  return Presence.findByIdAndUpdate(
    userTodayPresence._id,
    { checkOut: new Date() },
    { new: true }
  );
};

const addPresence = asyncHandler(async (userId, type) => {
  const today = moment().startOf('day');
  const userTodayPresence = await Presence.findOne({
    userId,
    checkIn: {
      $gte: today.toDate(),
      $lte: moment(today).endOf('day').toDate()
    }
  });
  let updatedUserTodayPresence;

  switch (type) {
    case 'IN':
      updatedUserTodayPresence = await handleCheckIn(userTodayPresence, userId);
      break;
    case 'OUT':
      updatedUserTodayPresence = await handleCheckOut(userTodayPresence);
      break;
    default:
      break;
  }
  return mapPresence(updatedUserTodayPresence);
});

module.exports = addPresence;
