import http from '../helpers/http';
import AttributeService from '../services/attribute';

/**
 * - create - This method should create a new attribute and attributeValues recored
 * - getAllAttributes - This method should return an array of all attributes
 * - getSingleAttribute - This method should return a single attribute using the attribute_id in the request parameter
 * - getAttributeValues - This method should return an array of all attribute values of a single attribute using the attribute id
 * - getProductAttributes - This method should return an array of all the product attributes
 */
class AttributeController {
  /**
   * create a new attribute record
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} JSON Object of created attribute
   * @memberof AttributeController
   */
  static async create(req, res, next) {
    try {
      const newAttribute = await AttributeService.createAttribute(req.body);
      return http.httpSingleRecordResponse(req, res, newAttribute, 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * add an attribute value
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} JSON server response
   * @memberof AttributeController
   */
  static async addAttributeValue(req, res, next) {
    const {
      body: { value },
      params: { attribute_id },
    } = req;
    try {
      await AttributeService.addAttributeValue({ value, attribute_id });
      return http.httpSingleRecordResponse(
        req,
        res,
        { status: 201, message: 'Attribute value added successfully' },
        201
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * This method get all attributes
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} JSON server response
   * @memberof AttributeController
   */
  static async getAllAttributes(req, res, next) {
    try {
      const attributes = await AttributeService.getAllAttributes();
      return http.httpCollectionRecordResponse(req, res, attributes);
    } catch (error) {
      next(error);
    }
  }

  /**
   * This method gets a single attribute using the attribute id
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} JSON server response
   * @memberof AttributeController
   */
  static async getSingleAttribute(req, res, next) {
    const { attribute_id } = req.params;
    try {
      return http.httpSingleRecordResponse(
        req,
        res,
        await AttributeService.getAttributeById(attribute_id)
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * This method gets a list attribute values in an attribute using the attribute id
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} JSON server response
   * @memberof AttributeController
   */
  static async getAttributeValues(req, res, next) {
    try {
      return http.httpCollectionRecordResponse(
        req,
        res,
        await AttributeService.getAttributeValues(req.params.attribute_id)
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * This method gets a list attribute values in a product using the product id
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} JSON server response
   * @memberof AttributeController
   */
  static async getProductAttributes(req, res, next) {
    try {
      const productAttributes = await AttributeService.getProductAttributes(req.params.product_id);
      return http.httpCollectionRecordResponse(req, res, productAttributes);
    } catch (error) {
      next(error);
    }
  }
}

export default AttributeController;
