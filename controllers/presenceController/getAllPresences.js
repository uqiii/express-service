const asyncHandler = require('express-async-handler');
const moment = require('moment');

const Presence = require('../../models/presence');

const getPresences = asyncHandler(async (query, pagination) => {
  const {
    page, limit, sortBy, orderBy
  } = pagination;
  const { startDate, endDate } = query;

  const presences = await Presence.aggregate([
    {
      $match: {
        checkIn: {
          $gte: startDate ? moment(startDate).toDate() : moment().startOf('month').toDate(),
          $lte: endDate ? moment(endDate).toDate() : moment().endOf('day').toDate()
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
    { $sort: { [sortBy]: orderBy } },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$checkIn' } },
        userPresences: { $push: '$$ROOT' }
      }
    },
    {
      $project: {
        _id: 0,
        date: '$_id',
        userPresences: 1
      }
    },
    { $skip: (page - 1) * limit },
    { $limit: limit }
  ]);
  return presences;
});

module.exports = getPresences;
