const Joi = require("@hapi/joi");

const categorySchema = Joi.object({
  title: Joi.string().min(5).max(50).required(),
  description: Joi.string().min(16).max(500).required(),
});

module.exports = {
  categorySchema,
};
