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
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getAllAttributes(req, res, next) {
    // write code to get all attributes from the database here
    return res.status(200).json({ message: 'this works' });
  }

  /**
   * This method gets a single attribute using the attribute id
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getSingleAttribute(req, res, next) {
    // Write code to get a single attribute using the attribute id provided in the request param
    return res.status(200).json({ message: 'this works' });
  }

  /**
   * This method gets a list attribute values in an attribute using the attribute id
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getAttributeValues(req, res, next) {
    // Write code to get all attribute values for an attribute using the attribute id provided in the request param
    // This function takes the param: attribute_id
    return res.status(200).json({ message: 'this works' });
  }

  /**
   * This method gets a list attribute values in a product using the product id
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getProductAttributes(req, res, next) {
    // Write code to get all attribute values for a product using the product id provided in the request param
    return res.status(200).json({ message: 'this works' });
  }
}

export default AttributeController;
