import models from '../database/models';
import BaseService from './base';

const { Customer } = models;

/**
 * @class CustomerService
 */
export default class CustomerService extends BaseService {
  /**
   * @description This creates a new customer
   *
   * @param {object} payload Customer data to registering
   * @returns {object} Return a Object of Customer with auth credencials
   */
  static async createCustomer(payload) {
    const newCustomer = await this.create(Customer, payload);
    const customerData = await CustomerService.getCustomer({
      customer_id: newCustomer.customer_id,
    });

    return CustomerService.getSafeDataValues(customerData);
  }

  /**
   * @description This method searches the customer table
   * and retrieves the row based on the option provided
   * @param  {object} option
   * @returns  {Promise<object>} customer
   * @member CustomerService
   */
  static async getCustomer(option) {
    const customer = await this.findOne(Customer, option);
    return customer;
  }

  /**
   * @description This service formats customer object to be returned to the client
   * @param  {object} customerData
   * @returns  {object} formatted customer object
   * @member CustomerService
   */
  static getSafeDataValues(customerData) {
    return {
      customer: {
        schema: customerData.getSafeDataValues(),
      },
      accessToken: `Bearer ${customerData.generateToken()}`,
      expires_in: '24h',
    };
  }
}
