const USER_ALREADY_REGISTERED = {
  status: 400,
  code: 'USER_ALREADY_REGISTERED',
  message: 'User already registered'
};

const USER_NOT_FOUND = {
  status: 404,
  code: 'USER_NOT_FOUND',
  message: 'User not found'
};

const USER_DELETE_FAILED = {
  status: 500,
  code: 'USER_DELETE_FAILED',
  message: 'Failed to delete user'
};

const INVALID_USER_DATA = {
  status: 400,
  code: 'INVALID_USER_DATA',
  message: 'Invalid user data'
};

module.exports = {
  USER_ALREADY_REGISTERED,
  USER_NOT_FOUND,
  INVALID_USER_DATA,
  USER_DELETE_FAILED
};
