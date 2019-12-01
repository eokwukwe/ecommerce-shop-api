import isEmpty from 'lodash.isempty';

import http from '../helpers/http';
import DepartmentService from '../services/department';

/**
 *
 *
 * @class DepartmentController
 */
export default class DepartmentController {
  /**
   * create a department record
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} JSON Object of created department
   * @memberof DepartmentController
   */
  static async create(req, res, next) {
    const { name, description } = req.body;
    try {
      const newDepartment = await DepartmentService.createDepartment({
        name,
        description,
      });
      return http.httpSingleRecordResponse(req, res, newDepartment, 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all departments
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {array} array of JSON Object of departments
   * @memberof DepartmentController
   */
  static async getAllDepartments(req, res, next) {
    try {
      const allDepartments = await DepartmentService.getDepartments();
      return http.httpCollectionRecordResponse(req, res, allDepartments, true);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get a department by id
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {object} JSON Object of department
   * @memberof DepartmentController
   */
  static async getOneDepartment(req, res, next) {
    const id = parseInt(req.params.id, 10);
    try {
      const department = await DepartmentService.getDepartmentById(id);
      if(isEmpty(department)) {
        const options = {
          errorCode: 'DEP_02',
          message: `Does not exist department with ID ${id}`
        }
        return http.httpErrorResponse(res,  options, 404)
      }
      return http.httpSingleRecordResponse(req, res, department.dataValues, 200);
    } catch (error) {
      next(error);
    }
  }
}
