import jwt from 'jsonwebtoken';

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
}
