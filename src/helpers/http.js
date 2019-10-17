import createCache from './createCache';
import logger from './logger';

/**
 * @class BaseController
 */
export default {
  /**
   * @description This method returns a server respone object for a
   *    single record and caches the record is cache is true
   *
   * @param {object} req HTTP request object
   * @param {object} res HTTP respone object
   * @param {object} data The record to send in the response
   * @param {boolean} isCache Indicates if the record will be cached
   * @return {object} server reponse
   */
  httpSingleRecordResponse(req, res, data, isCache = false) {
    if (isCache) {
      createCache(req.originalUrl, { ...data });
    }
    return res.status(200).json({ ...data });
  },

  /**
   * @description This method returns a server respone object for a
   *    collection of records and caches the record is cache is true
   *
   * @param {object} req HTTP request object
   * @param {object} res HTTP respone object
   * @param {object} data The record to send in the response
   * @param {boolean} isCache Indicates if the record will be cached
   * @return {object} server reponse
   */
  httpCollectionRecordResponse(req, res, data, isCache = false) {
    if (isCache) {
      createCache(req.originalUrl, { data });
    }
    return res.status(200).json([...data]);
  },

  /**
   * @description This method returns error respone object
   *
   * @param {object} res HTTP respone object
   * @param {object} options The info about the error (code, field, message )
   * @param {number} statusCode
   * @return {object} server reponse
   */
  validationErrorResponse(res, options, statusCode) {
    const error = {
      status: statusCode,
      code: options.errorCode,
      message: options.message,
      field: options.field,
    };
    return res.status(statusCode).json({ error });
  },

  /**
   * @description This method returns server error respone
   *
   * @param {object} res HTTP respone object
   * @param {object} option The info about the error (code, field, message )
   * @param {boolean} isCache Indicates if the record will be cached
   * @return {object} server reponse
   */
  httpServerError(res) {
    return res.status(500).json({
      error: {
        status: 500,
        message: 'Server unavailable',
      },
    });
  },
};
