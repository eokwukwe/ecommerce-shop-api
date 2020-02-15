import http from '../helpers/http';
import models from '../database/models';
import ProductService from '../services/product';

/**
 * The Product controller contains all static methods that handles
 * product  request
 *
 * The static methods and their function include:
 * - create - Create a new product
 */

const { Sequelize } = models;
const { Op } = Sequelize;

/**
 *
 *
 * @class ProductController
 */
export default class ProductController {
  /**
   * create a new product record
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} JSON Object of created product
   * @memberof ProductController
   */
  static async create(req, res, next) {
    try {
      const newProduct = await ProductService.createProduct(req.body);
      return http.httpSingleRecordResponse(req, res, newProduct, 201);
    } catch (error) {
      next(error);
    }
  }
}
