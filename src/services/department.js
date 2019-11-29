import models from '../database/models';
import BaseService from './base';

const { Department } = models;

/**
 * @class DepartmentService
 */
export default class DepartmentService extends BaseService {
  /**
   * @description This creates a new department
   *
   * @param {object} payload Department data
   * @returns {object} Return a Object of created department
   */
  static async createDepartment(payload) {
    const department = await this.create(Department, payload);
    return department.dataValues;
  }
}
