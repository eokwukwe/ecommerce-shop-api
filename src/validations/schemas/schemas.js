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
	.label('shipping_region_id');

const access_token = Joi.string()
	.required()
	.trim()
	.label('access_token');

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
