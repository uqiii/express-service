const Joi = require('@hapi/joi');

const getUserSchema = {
  params: Joi.object().keys({
    userId: Joi.string().required()
  }).unknown()
};

const getUsersSchema = {
  query: Joi.object().keys({
    page: Joi.string(),
    limit: Joi.string()
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
    phone: Joi.string(),
    avatar: Joi.string(),
    position: Joi.string(),
    password: Joi.string().forbidden()
  }).unknown()
};

const updateCurrentUserSchema = {
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    avatar: Joi.string(),
    position: Joi.string().forbidden(),
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
    phone: Joi.string().required(),
    password: Joi.string().required(),
    position: Joi.string().required(),
    avatar: Joi.string()
  }).unknown()
};

const loginUserSchema = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  }).unknown()
};

const addCurrentUserPresenceSchema = {
  query: Joi.object().keys({
    type: Joi.string().valid('IN', 'OUT').required()
  }).unknown()
};

const getCurrentUserPresenceSchema = {
  query: Joi.object().keys({
    page: Joi.string(),
    limit: Joi.string()
  }).unknown()
};

module.exports = {
  createUserSchema,
  getUserSchema,
  deleteUserSchema,
  updateUserSchema,
  loginUserSchema,
  updateCurrentUserSchema,
  updateCurrentUserPasswordSchema,
  addCurrentUserPresenceSchema,
  getUsersSchema,
  getCurrentUserPresenceSchema
};
