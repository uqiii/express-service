const asyncHandler = require('express-async-handler');
const moment = require('moment');
const { ObjectId } = require('mongodb');

const Presence = require('../../models/presence');

const getPresences = asyncHandler(async (query, pagination) => {
  const {
    page, limit, sortBy, orderBy
  } = pagination;
  const startOfThisMonth = moment().startOf('month').toDate();
  const endOfThisDay = moment().endOf('day').toDate();
  const { userId, startDate = startOfThisMonth, endDate = endOfThisDay } = query;

  const presences = await Presence.aggregate([
    {
      $match: {
        ...userId ? { userId: new ObjectId(userId) } : {},
        checkIn: {
          $gte: startDate,
          $lte: endDate
        }
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'userDetails'
      }
    },
    { $unwind: '$userDetails' },
    {
      $project: {
        _id: 0,
        userId: 1,
        checkIn: 1,
        checkOut: 1,
        userName: '$userDetails.name'
      }
    },
    { $skip: (page - 1) * limit },
    { $limit: limit },
    { $sort: { [sortBy]: orderBy } }
  ]);

  return presences;
});

module.exports = getPresences;
