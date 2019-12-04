import isEmpty from 'lodash.isempty';
import models from '../database/models';
import http from '../helpers/http';

const { Department } = models;

export default async (req, res, next) => {
  try {
    const department = await Department.findByPk(req.body.department_id)
    if (isEmpty(department)) {
      const options = {
        errorCode: 'DEP_02',
        message: `Department with ID '${req.body.department_id}' does not exists`,
        field: 'department',
      };
      return http.httpErrorResponse(res, options, 404);
    }
    return next();
  } catch (error) {
    return next(error);
  }
};
