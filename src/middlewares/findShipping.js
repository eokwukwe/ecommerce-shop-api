import isEmpty from 'lodash.isempty';

import models from '../database/models';
import http from '../helpers/http';

const { ShippingRegion } = models;

export const findShippingRegion = async (req, res, next) => {
	const regionId = parseInt(req.body.shipping_region_id, 10);
	const shippingRegion = await ShippingRegion.findByPk(regionId);
	if (isEmpty(shippingRegion)) {
		const options = {
			errorCode: 'SHR_01',
			message: `Shipping region with ID ${regionId} not found`,
			field: 'shipping_region',
		};
		return http.httpErrorResponse(res, options, 400);
	}
	return next();
};
