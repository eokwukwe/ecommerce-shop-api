import models from '../database/models';
import BaseService from './base';

const { Category } = models;

/**
 * @class CategoryService
 */
export default class CategoryService extends BaseService {
  /**
   * @description This method creates a new category
   *
   * @param {object} payload Category data
   * @returns {object} Return a Object of created category
   */
  static async createCategory(payload) {
    const category = await this.create(Category, payload);
    return category.dataValues;
  }

  /**
   * @description This method fetches all category
   *
   * @returns {object} Return a Object of created category
   */
  static async getCategories() {
    return await this.findAll(Category);
  }

  /**
   * @description This method fetches a category by Id
   *
   * @returns {object} Return a Object of created category
   */
  static async getCategoryById(category_id) {
    return await this.findByPk(Category, category_id);
  }
}
