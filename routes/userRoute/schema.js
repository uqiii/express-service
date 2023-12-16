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
    email: Joi.string(),
    password: Joi.string().forbidden()
  }).unknown()
};

const updateCurrentUserSchema = {
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string(),
    password: Joi.string().forbidden()
  }).unknown()
};

const updateCurrentUserPasswordSchema = {
  body: Joi.object().keys({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required()
  }).unknown()
};

const createUserSchema = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
  }).unknown()
};

const loginUserSchema = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  }).unknown()
};

module.exports = {
  createUserSchema,
  getUserSchema,
  deleteUserSchema,
  updateUserSchema,
  loginUserSchema,
  updateCurrentUserSchema,
  updateCurrentUserPasswordSchema
};
