const unpackQueryParams = (req) => {
  const {
    page, limit, sortBy, orderBy, ...query
  } = req.query;
  return {
    pagination: {
      page, limit, sortBy, orderBy
    },
    query
  };
};

module.exports = unpackQueryParams;
