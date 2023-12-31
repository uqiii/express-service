const Joi = require('@hapi/joi');

const getAdminSchema = {
  params: Joi.object().keys({
    adminId: Joi.string().required()
  }).unknown()
};

const getAdminsSchema = {
  query: Joi.object().keys({
    page: Joi.string(),
    limit: Joi.string(),
    sortBy: Joi.string(),
    orderBy: Joi.string().valid('asc', 'desc')
  }).unknown()
};

const deleteAdminSchema = {
  params: Joi.object().keys({
    adminId: Joi.string().required()
  }).unknown()
};

const updateAdminSchema = {
  params: Joi.object().keys({
    adminId: Joi.string().required()
  }).unknown(),
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string(),
    password: Joi.string().forbidden()
  }).unknown()
};

const updateCurrentAdminSchema = {
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string(),
    password: Joi.string().forbidden()
  }).unknown()
};

const createAdminSchema = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
  }).unknown()
};

const loginAdminSchema = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  }).unknown()
};

module.exports = {
  createAdminSchema,
  getAdminSchema,
  deleteAdminSchema,
  updateAdminSchema,
  loginAdminSchema,
  updateCurrentAdminSchema,
  getAdminsSchema
};
