import isEmpty from 'lodash.isempty';
import http from '../helpers/http';
import { notFoundErrorCodes } from '../helpers/constants';
import { generateModelName } from '../helpers/utils';

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
      const modelName = generateModelName(Object.keys(req.params)[0]);
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

/**
 * This middleware checks is a record exists in the database using the id of the
 * record. The id is in the request body not the params
 *
 * @param {object} modelOptions.
 *  Format - modelOptions = {id: 'model_id', model: Model}
 *  E.g. To check if a category exists:
 *  the modelOptions will be {id: 'category_id', model: Category}
 *
 * @returns HTTP reponse
 */
export const checkRecordExitsFromBody = modelOptions => async (req, res, next) => {
  try {
    const { id, model } = modelOptions;
    const modelName = generateModelName(id);
    const record = await model.findByPk(req.body[id]);
    if (isEmpty(record)) {
      const options = {
        errorCode: notFoundErrorCodes[modelName],
        message: `Does not exist ${modelName} with ID ${req.body[id]}`,
      };
      return http.httpErrorResponse(res, options, 404);
    }
    return next();
  } catch (error) {
    next(error);
  }
};
