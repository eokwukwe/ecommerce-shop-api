import models from '../database/models';
import BaseService from './base';

const { Attribute, AttributeValue } = models;

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
}
