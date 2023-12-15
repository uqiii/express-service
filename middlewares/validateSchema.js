const createError = require('http-errors');

const validate = (schema, payload) => {
  const result = schema.validate(payload);
  if (result.error) {
    throw createError(400, result.error, { code: 'SCHEMA_VALIDATION_ERROR', message: result.error.message });
  }
};

const validateSchema = (schema) => (req, res, next) => {
  const {
    query: querySchema,
    params: paramsSchema,
    body: bodySchema
  } = schema;
  const { query, params, body } = req;
  if (querySchema) {
    validate(querySchema, query);
  }
  if (paramsSchema) {
    validate(paramsSchema, params);
  }
  if (bodySchema) {
    validate(bodySchema, body);
  }

  return next();
};

module.exports = validateSchema;
