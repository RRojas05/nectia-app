const Joi = require("joi");

const id= Joi.number().integer().min(1);
const title = Joi.string().min(3).max(40);
const price = Joi.number().integer().min(1);
const image = Joi.string();
// const image = Joi.string().uri();
const code = Joi.number().integer().min(4);

const createGameSchema = Joi.object({
  id:id,
  title: title.required(),
  price: price.required(),
  image: image.required(),
  code: code.required(),
});

const updateGameSchema = Joi.object({
  id:id,
  title: title,
  price: price,
  image: image,
  code: code,
});

const getGameSchema = Joi.object({
  code: code.required(),
});

module.exports = { createGameSchema, updateGameSchema, getGameSchema };
