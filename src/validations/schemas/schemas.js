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

const address_1 = Joi.string()
  .required()
  .min(5)
  .trim()
  .label('address_1');

const address_2 = Joi.string()
  .allow('')
  .trim()
  .strict()
  .label('address_2');

const city = Joi.string()
  .required()
  .min(2)
  .trim()
  .label('city');

const region = Joi.string()
  .required()
  .min(1)
  .trim()
  .label('region');

const postal_code = Joi.string()
  .required()
  .trim()
  .label('postal_code');

const country = Joi.string()
  .required()
  .min(2)
  .trim()
  .label('country');

const shipping_region_id = Joi.number()
  .integer()
  .required()
  .strict()
  .label('shipping_region_id');

const department_id = Joi.number()
  .integer()
  .required()
  .strict()
  .label('department_id');

const access_token = Joi.string()
  .required()
  .trim()
  .label('access_token');

const day_phone = Joi.string()
  .allow('')
  .trim()
  .strict()
  .label('day_phone');

const eve_phone = Joi.string()
  .allow('')
  .trim()
  .strict()
  .label('eve_phone');

const mob_phone = Joi.string()
  .allow('')
  .trim()
  .strict()
  .label('mob_phone');

const credit_card = Joi.string()
  .required()
  .trim()
  .label('credit_card');

const description = Joi.string()
  .allow('')
  .trim()
  .strict()
  .label('description');

export const signUpSchema = Joi.object().keys({
  name,
  email,
  password,
});

export const loginSchema = Joi.object().keys({
  email,
  password,
});

export const facebookAccessTokenSchema = Joi.object().keys({
  access_token,
});

export const updateAddressSchema = Joi.object().keys({
  address_1,
  address_2,
  city,
  region,
  postal_code,
  country,
  shipping_region_id,
});

export const updateProfileSchema = Joi.object().keys({
  name,
  email,
  day_phone,
  eve_phone,
  mob_phone,
});

export const updateCreditCardSchema = Joi.object().keys({
  credit_card,
});

export const departmentSchema = Joi.object().keys({
  name,
  description
});

export const categorySchema = Joi.object().keys({
  name,
  department_id,
  description
});
