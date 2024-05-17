const Joi = require("@hapi/joi");

const userSchema = Joi.object({
  fullName: Joi.string().min(6).max(50).required(),
  typeAccount: Joi.string().min(1).max(50).required(),
  username: Joi.string().min(6).max(50).required(),
  dateBirday: Joi.string().required(),
  phoneNumber: Joi.string().min(9).max(11).required(),
  country: Joi.string().min(3).max(30).required(),
  urlAvatar: Joi.string().uri().min(6).max(250),
  email: Joi.string().email().min(5).max(50).required(),
  password: Joi.string().min(6).required(),
  admin: Joi.boolean(),
});

const userSchemaUpdate = Joi.object({
  fullName: Joi.string().min(6).max(50).required(),
  typeAccount: Joi.string().min(1).max(50).required(),
  username: Joi.string().min(6).max(50).required(),
  dateBirday: Joi.string().required(),
  phoneNumber: Joi.string().min(9).max(11).required(),
  country: Joi.string().min(3).max(30).required(),
  urlAvatar: Joi.string().uri().min(6).max(250),
  email: Joi.string().email().min(5).max(50).required(),
  // password: Joi.string().min(6).required(),
  admin: Joi.boolean(),
});

module.exports = {
  userSchema,
  userSchemaUpdate,
};
