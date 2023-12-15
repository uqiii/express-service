const Joi = require('@hapi/joi');

const getUserSchema = {
  params: Joi.object().keys({
    userId: Joi.string().required()
  }).unknown()
};

const deleteUserSchema = {
  params: Joi.object().keys({
    userId: Joi.string().required()
  }).unknown()
};

const updateUserSchema = {
  params: Joi.object().keys({
    userId: Joi.string().required()
  }).unknown(),
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string()
  }).unknown()
};

const createUserSchema = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
  }).unknown()
};

module.exports = {
  createUserSchema,
  getUserSchema,
  deleteUserSchema,
  updateUserSchema
};
