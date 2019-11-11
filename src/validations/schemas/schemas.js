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

const access_token = Joi.string()
  .required()
  .trim()
  .label('access_token');

export const signUpSchema = Joi.object().keys({
  name,
  email,
  password,
});

export const facebookAccessTokenSchema = Joi.object().keys({
  access_token,
});
