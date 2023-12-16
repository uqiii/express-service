const asyncHandler = require('express-async-handler');

const { getPresences } = require('../../controllers/presenceController');
const unpackQueryParams = require('../../utils/unpackQueryParams');

const handleGetPresences = asyncHandler(async (req, res) => {
  const { pagination, query } = unpackQueryParams(req);
  const accessToken = await getPresences(query, pagination);
  res.status(200).json(accessToken);
});

module.exports = {
  handleGetPresences
};
