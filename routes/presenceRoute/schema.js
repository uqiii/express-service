const Joi = require('@hapi/joi');

const getPresencesSchema = {
  query: Joi.object().keys({
    page: Joi.number(),
    limit: Joi.number(),
    sortBy: Joi.string(),
    orderBy: Joi.string().valid('asc', 'desc'),
    userId: Joi.string(),
    startDate: Joi.string(),
    endDate: Joi.string()
  }).unknown()
};

module.exports = {
  getPresencesSchema
};
