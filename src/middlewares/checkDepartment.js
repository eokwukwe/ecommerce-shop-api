import isEmpty from 'lodash.isempty';
import models from '../database/models';
import http from '../helpers/http';

const { Department } = models;

export default async (req, res, next) => {
  try {
    const department = await Department.findOne({
      attributes: ['name'],
      where: { name: req.body.name },
    });
    if (!isEmpty(department)) {
      const options = {
        errorCode: 'DEP_03',
        message: `Department '${req.body.name}' already exists`,
        field: 'department',
      };
      return http.httpErrorResponse(res, options, 400);
    }
    return next();
  } catch (error) {
    return next(error);
  }
};
