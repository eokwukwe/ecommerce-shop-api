import { validator } from '../validations/validator';
import {
	signUpSchema,
	loginSchema,
	facebookAccessTokenSchema,
	updateAddressSchema,
	updateProfileSchema
} from '../validations/schemas/schemas';

/**
 * @description Get the schema definition for a route
 *
 * @param {object} req the request object
 * @returns {Joi.object} a Joi object
 */
const getSchema = req => {
	const schema = {
		'/customers': signUpSchema,
		'/login': loginSchema,
		'/facebook': facebookAccessTokenSchema,
		'/address': updateAddressSchema,
		'/profile': updateProfileSchema
	};
	const path = req.originalUrl.split('/').pop();
	return schema[`/${path}`];
};

/**
 * @description Validate user input
 *
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next callback
 * @returns {funcion} next
 */
export default async (req, res, next) => {
	const validation = await validator(req.body, getSchema(req));
	if (validation.hasError) {
		return res.status(400).json({
			errors: validation.errors,
		});
	}
	req.body = validation.fields;
	return next();
};
