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
        department_id
      });
      return http.httpSingleRecordResponse(req, res, newCategory, 201);
    } catch (error) {
      next(error);
    }
  }

  // /**
  //  * Get all departments
  //  *
  //  * @static
  //  * @param {object} req express request object
  //  * @param {object} res express response object
  //  * @param {object} next next middleware
  //  * @returns {array} array of JSON Object of departments
  //  * @memberof DepartmentController
  //  */
  // static async getAllDepartments(req, res, next) {
  //   try {
  //     const allDepartments = await DepartmentService.getDepartments();
  //     return http.httpCollectionRecordResponse(req, res, allDepartments, true);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // /**
  //  * Get a department by id
  //  *
  //  * @static
  //  * @param {object} req express request object
  //  * @param {object} res express response object
  //  * @param {object} next next middleware
  //  * @returns {object} JSON Object of department
  //  * @memberof DepartmentController
  //  */
  // static async getOneDepartment(req, res, next) {
  //   const id = parseInt(req.params.id, 10);
  //   try {
  //     const department = await DepartmentService.getDepartmentById(id);
  //     if(isEmpty(department)) {
  //       const options = {
  //         errorCode: 'DEP_02',
  //         message: `Does not exist department with ID ${id}`
  //       }
  //       return http.httpErrorResponse(res,  options, 404)
  //     }
  //     return http.httpSingleRecordResponse(req, res, department.dataValues, 200);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}
