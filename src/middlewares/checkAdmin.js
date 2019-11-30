import isEmpty from 'lodash.isempty';
import models from '../database/models';
import http from '../helpers/http';

const { Customer } = models;

/**
 * @description This middleware checks for an admin user
 * @param  {object} req HTTP request object
 * @param  {object} res HTTP rewpone object
 * @param  {function} next
 * @return  {object} Server Response
 */
export default async (req, res, next) => {
  const customer_id = parseInt(req.user.customer_id, 10);
  try {
    const customer = await Customer.findByPk(customer_id);
    if (!customer.is_admin || isEmpty(customer)) {
      const options = {
        errorCode: 'AUT_02',
        message: 'Access denied.',
        field: 'NoAuth',
      };
      return http.httpErrorResponse(res, options, 401);
    }
    return next();
  } catch (error) {
    return next(error);
  }
};
