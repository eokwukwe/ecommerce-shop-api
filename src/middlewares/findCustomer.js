import isEmpty from 'lodash.isempty';
import models from '../database/models';
import http from '../helpers/http';

const { Customer } = models;

export default async (req, res, next) => {
	const customer_id = parseInt(req.user.customer_id, 10);
	try {
		const customer = await Customer.findByPk(customer_id);
		if (isEmpty(customer)) {
			const options = {
				errorCode: 'USR_05',
				message: `Does not exist customer with ID ${customer_id}`,
				field: 'customer_id',
			};
			return http.httpErrorResponse(res, options, 404);
		}
		req.customer = customer;
		return next();
	} catch (error) {
		return next(error);
	}
};
