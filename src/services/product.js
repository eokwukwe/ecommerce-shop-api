import models from '../database/models';
import BaseService from './base';

const { Product, ProductCategory, ProductAttribute } = models;

/**
 * @class ProductService
 */
export default class ProductService extends BaseService {
  /**
   * @description This method creates a new product record
   *
   * @param {object} payload Product data
   * @returns {object} Return an object of created product
   */
  static async createProduct(payload) {
    const { category_id, attribute_value_id, ...rest } = payload;
    const product = await this.create(Product, rest);
    await product.addAttribute(attribute_value_id);
    await product.addCategory(category_id);
    return product.dataValues;
  }
}
