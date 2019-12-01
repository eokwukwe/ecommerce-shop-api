import models from '../database/models';
import BaseService from './base';

const { Department } = models;

/**
 * @class DepartmentService
 */
export default class DepartmentService extends BaseService {
  /**
   * @description This method creates a new department
   *
   * @param {object} payload Department data
   * @returns {object} Return a Object of created department
   */
  static async createDepartment(payload) {
    const department = await this.create(Department, payload);
    return department.dataValues;
  }

  /**
   * @description This method fetches all departments
   *
   * @returns {object} Return a Object of created department
   */
  static async getDepartments() {
    return await this.findAll(Department);
  }

  /**
   * @description This method fetches a department by Id
   *
   * @returns {object} Return a Object of created department
   */
  static async getDepartmentById(department_id) {
    return await this.findByPk(Department, department_id);
  }
}
