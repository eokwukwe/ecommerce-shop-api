import isEmpty from 'lodash.isempty';

import http from '../helpers/http';
import CustomerService from '../services/customer';
import { Customer } from '../database/models';
import verifyFacebookToken from '../helpers/verifyFacebookToken';

/**
 *
 *
 * @class CustomerController
 */
export default class CustomerController {
  /**
   * create a customer record
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} JSON Object of Customer with auth credencials
   * @memberof CustomerController
   */
  static async create(req, res, next) {
    const { name, email, password } = req.body;
    try {
      const newCustomer = await CustomerService.createCustomer({
        name,
        email,
        password,
      });
      return http.httpSingleRecordResponse(req, res, newCustomer, 201);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * log in a customer
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} JSON Object of Customer with auth credencials
   * @memberof CustomerController
   */
  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const customer = await CustomerService.getCustomer({ email });
      const options = {
        errorCode: 'USR_01',
        field: 'email/password',
        message: 'Email or Password is invalid.',
      };
      if (!isEmpty(customer)) {
        const validatePassword = await customer.validatePassword(password);
        if (validatePassword) {
          const customerSafeData = CustomerService.getSafeDataValues(customer);
          return http.httpSingleRecordResponse(req, res, customerSafeData);
        }
        return http.httpErrorResponse(res, options, 400);
      }
      return http.httpErrorResponse(res, options, 400);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Login/signup a customer using Facebook
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} JSON Object of Customer with auth credencials
   * @memberof CustomerController
   */
  static async facebookLogin(req, res, next) {
    const { access_token } = req.body;
    try {
      const {
        data: { email, name },
      } = await verifyFacebookToken(access_token);
      const registeredCustomer = CustomerService.getCustomer({ email });
      if (isEmpty(registeredCustomer)) {
        const newCustomer = await CustomerService.createCustomer({
          name,
          email,
          password: 'password',
        });
        return http.httpSingleRecordResponse(req, res, newCustomer);
      }
      const customerSafeData = CustomerService.getSafeDataValues(registeredCustomer);
      return http.httpSingleRecordResponse(req, res, customerSafeData);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * get customer profile data
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status customer profile data
   * @memberof CustomerController
   */
  static async getCustomerProfile(req, res, next) {
    // fix the bugs in this code
    const { customer_id } = req; // eslint-disable-line
    try {
      const customer = await Customer.findByPk(customer_id);
      return res.status(400).json({
        customer,
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * update customer profile data such as name, email, password, day_phone, eve_phone and mob_phone
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status customer profile data
   * @memberof CustomerController
   */
  static async updateCustomerProfile(req, res, next) {
    // Implement function to update customer profile like name, day_phone, eve_phone and mob_phone
    return res.status(200).json({ message: 'this works' });
  }

  /**
   * update customer profile data such as address_1, address_2, city, region, postal_code, country and shipping_region_id
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status customer profile data
   * @memberof CustomerController
   */
  static async updateCustomerAddress(req, res, next) {
    // write code to update customer address info such as address_1, address_2, city, region, postal_code, country
    // and shipping_region_id
    return res.status(200).json({ message: 'this works' });
  }

  /**
   * update customer credit card
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status customer profile data
   * @memberof CustomerController
   */
  static async updateCreditCard(req, res, next) {
    // write code to update customer credit card number
    return res.status(200).json({ message: 'this works' });
  }
}
