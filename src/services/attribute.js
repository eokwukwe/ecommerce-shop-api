import models from '../database/models';
import BaseService from './base';

const { Attribute, AttributeValue, ProductAttribute } = models;

/**
 * @class AttributeService
 */
export default class AttributeService extends BaseService {
  /**
   * @description This method creates a new attribute record
   *
   * @param {object} payload Attribute data
   * @returns {object} Return an object of created attribute
   */
  static async createAttribute(payload) {
    const attribute = await this.create(Attribute, payload);
    return attribute.dataValues;
  }

  /**
   * @description This method add a new attribute value
   *
   * @param {object} payload AttributeValue data
   * @returns {void}
   */
  static async addAttributeValue(payload) {
    const { attribute_id, value } = payload;
    const attribute = await this.findByPk(Attribute, attribute_id);
    return await attribute.createAttributeValue({ attribute_id, value });
  }

  /**
   * @description This method fetches all attributes
   *
   * @returns {array} Array of all attributes
   */
  static async getAllAttributes() {
    return this.findAll(Attribute);
  }

  /**
   * @description This method gets a single attribute using the attribute id
   *
   * @param {string} attribute_id
   * @returns {object} Return an object of an attribute
   */
  static async getAttributeById(attribute_id) {
    const attribute = await this.findByPk(Attribute, attribute_id);
    return attribute.dataValues;
  }

  /**
   * @description This method gets a list attribute values in an attribute using the attribute id
   *
   * @param {string} attribute_id
   * @returns {array} Return an array of attribute with its values
   */
  static async getAttributeValues(attribute_id) {
    const attribute = await this.findByPk(Attribute, attribute_id);
    const values = await attribute.getAttributeValues();
    return values.reduce((acc, value) => {
      acc.push({
        attribute_value_id: value.attribute_value_id,
        value: value.value,
      });
      return acc;
    }, []);
  }

  /**
   * @description This method gets all attributes with produt ID
   *
   * @param {string} product_id
   * @returns {array} Return an array of product attributes
   */
  static async getProductAttributes(product_id) {
    const attributes = await ProductAttribute.findAll({
      where: { product_id },
      include: [
        {
          model: AttributeValue,
          include: [
            {
              model: Attribute,
              as: 'attribute_type',
              attributes: ['name'],
            },
          ],
        },
      ],
    });
    return attributes.reduce((acc, attribute) => {
      acc.push({
        attribute_name: attribute.AttributeValue.attribute_type.name,
        attribute_value_id: attribute.attribute_value_id,
        attribute_value: attribute.AttributeValue.value,
      });
      return acc;
    }, []);
  }
}
