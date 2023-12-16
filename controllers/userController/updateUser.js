const asyncHandler = require('express-async-handler');

const User = require('../../models/user');
const createError = require('../../utils/createError');
const { USER_NOT_FOUND, USER_UPDATE_FAILED, USER_EMAIL_PHONE_TAKEN } = require('../../errors');
const mapUser = require('../../mapper/mapUser');

const sanitizePayload = (payload) => {
  if (payload.email) {
    return {
      ...payload,
      email: payload.email.toLowerCase()
    };
  }
  return payload;
};

const validateEmailAndPhone = async (userId, email, phone) => {
  const validationQuery = [];
  if (email) validationQuery.push({ email });
  if (phone) validationQuery.push({ phone });
  const userExists = await User.findOne({
    $and: [
      { _id: { $ne: userId } },
      { $or: validationQuery }
    ]
  });
  if (userExists) throw createError(USER_EMAIL_PHONE_TAKEN);
};

const updateUser = asyncHandler(async (userId, payload) => {
  const user = await User.findOne({ _id: userId });
  if (!user) throw createError(USER_NOT_FOUND);

  const sanitizedPayload = sanitizePayload(payload);
  const { email, phone } = sanitizedPayload;
  if (email || phone) await validateEmailAndPhone(userId, email, phone);

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    sanitizedPayload,
    { new: true }
  );
  if (!updatedUser) throw createError(USER_UPDATE_FAILED);

  return mapUser(updatedUser);
});

module.exports = updateUser;
