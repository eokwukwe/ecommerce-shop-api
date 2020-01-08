import models from '../database/models';
import BaseService from './base';

const { Category, Department, Product } = models;

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
   * @returns {array} Return a array of categories
   */
  static async getCategories() {
    return await this.findAll(Category);
  }

  /**
   * @description This service fetches a category by Id
   *
   * @returns {object} Return an object of a category
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
    return CategoryService.prepareModelCategories(categories, 'product');
  }

  /**
   * @description This service fetches a list of categories of a Department
   *
   * @returns {object} Return a Object of all the department categories
   */
  static async getDepartmentCategories(department_id) {
    const department = await this.findByPk(Department, department_id);
    const categories = await department.getCategories();
    return CategoryService.prepareModelCategories(categories, 'department')
  }

  /**
   * @description This method prepares the categories to be returned
   *
   * @param {array} categories Array of model categories
   * @param {string} flag Indicates the model whose categories is been checked
   * @returns {array} Array of model categories
   */
  static prepareModelCategories(categories, flag) {
    const modelCategories = categories.reduce((acc, category) => {
      if (flag === 'product') {
        acc.push({
          category_id: category.category_id,
          department_id: category.department_id,
          name: category.name,
        });
      } else {
        acc.push({
          category_id: category.category_id,
          name: category.name,
          description: category.description,
          department_id: category.department_id,
        });
      }
      return acc;
    }, []);
    return modelCategories
  }
}
