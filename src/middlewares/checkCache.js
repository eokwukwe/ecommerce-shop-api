import client from '../config/cache';
import http from '../helpers/http';

const isTest = process.env.NODE_ENV === 'test';

/**
 * @description This method check
 * redis Cache if it is available,
 * it calles next if there is no such cache and returns the data in the cache if it is found
 * @param  {object} req
 * @param  {object} res
 * @param  {Function} next
 * @returns {object} server Response
 * @member CacheStorage
 */
export default (req, res, next) => {
  if (!isTest) {
    // const originalUrl = req.originalUrl;
    return client.get(`backend: ${req.originalUrl}`, (err, result) => {
      if (result) {
        const parsedData = JSON.parse(result);
        return http.httpCollectionRecordResponse(req, res, parsedData.data);
      }
      return next();
    });
  }
  return next();
};
