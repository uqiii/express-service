const Joi = require('@hapi/joi');

const getAdminSchema = {
  params: Joi.object().keys({
    adminId: Joi.string().required()
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
  updateCurrentAdminSchema
};
