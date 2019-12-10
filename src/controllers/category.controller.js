import isEmpty from 'lodash.isempty';

import http from '../helpers/http';
import CategoryService from '../services/category';

/**
 *
 *
 * @class CategoryController
 */
export default class CategoryController {
  /**
   * create a category record
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} JSON Object of created category
   * @memberof CategoryController
   */
  static async create(req, res, next) {
    const { name, description, department_id } = req.body;
    try {
      const newCategory = await CategoryService.createCategory({
        name,
        description,
        department_id,
      });
      return http.httpSingleRecordResponse(req, res, newCategory, 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all categories
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {array} array of JSON Object of categories
   * @memberof CategoryController
   */
  static async getAllCategories(req, res, next) {
    try {
      const categories = await CategoryService.getCategories();
      return http.httpCollectionRecordResponse(req, res, categories);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get a category by id
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {object} JSON Object of category
   * @memberof CategoryController
   */
  static async getCategoryById(req, res, next) {
    try {
      const { category_id } = req.params;
      const category = await CategoryService.getCategoryById(category_id);
      return http.httpSingleRecordResponse(req, res, category.dataValues, 200);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get product categories
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {array} JSON array of product categories
   * @memberof CategoryController
   */
  static async getProductCategories(req, res, next) {
    try {
      const { product_id } = req.params;
      const productCategories = await CategoryService.getProductCategories(product_id);
      return http.httpCollectionRecordResponse(req, res, productCategories, 200);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get department categories
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {array} JSON array of department categories
   * @memberof CategoryController
   */
  static async getDepartmentCategories(req, res, next) {
    try {
      const { department_id } = req.params;
      const departmentCategories = await CategoryService.getDepartmentCategories(department_id);
      return http.httpCollectionRecordResponse(req, res, departmentCategories, 200);
    } catch (error) {
      next(error);
    }
  }
}
