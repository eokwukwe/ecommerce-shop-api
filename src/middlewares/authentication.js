import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import http from '../helpers/http';
dotenv.config();
export default class Authentication {
  /**
   * @description Generate a token for the user
   *  The token expires in 24 hours
   * @param {number} customer_id The id of the customer
   * @returns {string} token
   * @mwmber Authentication
   */
  static generateToken(customer_id) {
    return jwt.sign({ customer_id }, process.env.JWT_KEY, { expiresIn: '24hr' });
  }

  /**
   * @description This method verifies the user token sent with the request
   * @param  {object} req
   * @param  {object} res
   * @param  {Function} next
   * @returns  {object} Server Response
   * @member Authentication
   */
  static async verifyToken(req, res, next) {
    const options = {
      errorCode: 'AUT_02',
      message: 'Access Unauthorized.',
      field: 'NoAuth',
    };
    try {
      const { user_key } = req.headers;
      if (typeof user_key === 'undefined') {
        return http.httpErrorResponse(res, options, 401);
      }
      const token = user_key.split(' ')[1];
      const decoded = await jwt.verify(token, process.env.JWT_KEY);
      req.user = decoded;
      return next();
    } catch (error) {
       options.field = 'token';
      return http.httpErrorResponse(res, options, 401);
    }
  }
}
