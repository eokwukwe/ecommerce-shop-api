import isEmpty from 'lodash.isempty';
import http from '../helpers/http';
import { notFoundErrorCodes } from '../helpers/constants';

/**
 * @description - Middleware to check if a record exists in the DB
 *
 * @param {object} model - the model whose record is to be checked
 * @returns {object} - object representing response message
 */
export default model => {
  return async (req, res, next) => {
    try {
      const id = Object.values(req.params)[0];
      const modelName = Object.keys(req.params)[0].split('_')[0];
      const result = await model.findByPk(id);
      if (isEmpty(result)) {
        const options = {
          errorCode: notFoundErrorCodes[modelName],
          message: `Does not exist ${modelName} with ID ${id}`,
        };
        return http.httpErrorResponse(res, options, 404);
      }
      return next();
    } catch (error) {
      return next(error);
    }
  };
};
