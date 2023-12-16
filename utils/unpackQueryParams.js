const unpackQueryParams = (req) => {
  const {
    page, limit, sortBy, orderBy, ...query
  } = req.query;
  return {
    pagination: {
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 10,
      sortBy: sortBy || 'createdAt',
      orderBy: orderBy === 'desc' ? -1 : 1
    },
    query
  };
};

module.exports = unpackQueryParams;
