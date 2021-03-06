import isEmpty from 'lodash.isempty';

import http from '../helpers/http';
import CustomerService from '../services/customer';
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
    const customer_id = parseInt(req.user.customer_id, 10);
    try {
      const data = await CustomerService.getCustomerById(customer_id);
      return http.httpSingleRecordResponse(req, res, data)
    } catch (error) {
      return next(error);
    }
  }

  /**
   * update customer profile data such as name, email, day_phone, eve_phone and mob_phone
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status customer profile data
   * @memberof CustomerController
   */
  static async updateCustomerProfile(req, res, next) {
    const { customer } = req;
    try {
      const updateProfile = await customer.updateProfile(req.body);
      return http.httpSingleRecordResponse(req, res, updateProfile, 200);
    } catch (error) {
      next(error);
    }
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
    const { customer } = req;
    try {
      const updateAddress = await customer.updateAddress(req.body);
      return http.httpSingleRecordResponse(req, res, updateAddress, 200);
    } catch (error) {
      next(error);
    }
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
    try {
      const { customer } = req;
			const updateCreditCard = await customer.updateCreditCard(req.body);
      return http.httpSingleRecordResponse(req, res, updateCreditCard, 200);
    } catch (error) {
      next(error);
    }
  }
}
