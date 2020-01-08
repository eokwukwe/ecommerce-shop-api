import models from '../database/models';
import BaseService from './base';

const { Attribute } = models;

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
}
