// data.form.js hold the form for the data controller

const Joi = require('@hapi/joi');

const dataSchema = Joi.object({
  id: Joi.string()
    .alphanum()
    .min(4)
    .max(30)
    .required(),

  some_string: Joi.string()
    .alphanum()
    .max(30),

  some_int: Joi.number()
    .integer(),
});

module.exports = dataSchema;
