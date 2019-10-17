import Joi from '@hapi/joi';

const name = Joi.string()
  .required()
  .min(2)
  .label('name');

const email = Joi.string()
  .email()
  .required()
  .trim()
  .lowercase()
  .label('email');

const password = Joi.string()
  .min(4)
  .required()
  .trim()
  .label('Password');

export const signUpSchema = Joi.object().keys({
  name,
  email,
  password,
});
