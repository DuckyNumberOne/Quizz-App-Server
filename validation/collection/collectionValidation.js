const Joi = require("@hapi/joi");

const collectionSchema = Joi.object({
  title: Joi.string().min(5).max(50).required(),
  description: Joi.string().min(16).max(500).required(),
  imgThumbnail: Joi.string().required(),
});

module.exports = {
  collectionSchema,
};
