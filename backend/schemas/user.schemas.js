const Joi = require("joi");

const name = Joi.string().min(3).max(20);
const email = Joi.string().email();
const password = Joi.string().min(6).max(20);

const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
});

const updateUserSchema = Joi.object({
  name: name,
  password: password,
  email: email,
});

const getUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
