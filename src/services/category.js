import models from '../database/models';
import BaseService from './base';

const { Category, ProductCategory, Product } = models;

/**
 * @class CategoryService
 */
export default class CategoryService extends BaseService {
  /**
   * @description This service creates a new category
   *
   * @param {object} payload Category data
   * @returns {object} Return a Object of created category
   */
  static async createCategory(payload) {
    const category = await this.create(Category, payload);
    return category.dataValues;
  }

  /**
   * @description This service fetches all category
   *
   * @returns {object} Return a Object of created category
   */
  static async getCategories() {
    return await this.findAll(Category);
  }

  /**
   * @description This service fetches a category by Id
   *
   * @returns {object} Return a Object of created category
   */
  static async getCategoryById(category_id) {
    return await this.findByPk(Category, category_id);
  }

  /**
   * @description This service fetches a list of categories of a Product
   *
   * @returns {object} Return a Object of all the product categories
   */
  static async getProductCategories(product_id) {
    const product = await this.findByPk(Product, product_id);
    const categories = await product.getCategories();
    const productCategories = categories.reduce((acc, category) => {
      acc.push({
        category_id: category.category_id,
        name: category.name,
        department_id: category.department_id,
      });
      return acc;
    }, []);
    return productCategories;
  }
}
