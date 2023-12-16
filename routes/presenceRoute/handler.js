const asyncHandler = require('express-async-handler');

const { getAllPresences } = require('../../controllers/presenceController');
const unpackQueryParams = require('../../utils/unpackQueryParams');

const handleGetPresences = asyncHandler(async (req, res) => {
  const { pagination, query } = unpackQueryParams(req);
  const presences = await getAllPresences(query, pagination);
  res.status(200).json(presences);
});

module.exports = {
  handleGetPresences
};
