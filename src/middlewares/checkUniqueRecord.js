import isEmpty from 'lodash.isempty';
import http from '../helpers/http';
import uniqueErrorCodes from '../helpers/constants';


/**
 * @description - Middleware to validate database unique constraints
 *
 * @param {object} model - the model whose record is to be checked
 * @returns {object} - object representing response message
 */
export default model => {
  return async (req, res, next) => {
    try {
      const result = await model.findOne({
        attributes: ['name'],
        where: { name: req.body.name },
      });
      if (!isEmpty(result)) {
        const modeName = result._modelOptions.name.singular;
        const options = {
          errorCode: uniqueErrorCodes[modeName],
          message: `${modeName} '${req.body.name}' already exists`,
          field: modeName.toLowerCase(),
        };
        return http.httpErrorResponse(res, options, 400);
      }
      return next();
    } catch (error) {
      return next(error);
    }
  };
};