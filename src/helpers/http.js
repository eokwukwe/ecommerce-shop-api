import createCache from './createCache';

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
  httpSingleRecordResponse(req, res, data, statusCode, isCache = false) {
    if (isCache) {
      createCache(req.originalUrl, { ...data });
    }
    return res.status(statusCode || 200).json({ ...data });
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
  httpErrorResponse(res, options, statusCode) {
    const error = {
      status: statusCode,
      code: options.errorCode,
      message: options.message,
      field: options.field,
    };
    return res.status(statusCode).json({ error });
  },
};
