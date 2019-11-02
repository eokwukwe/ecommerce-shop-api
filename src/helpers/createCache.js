import client from '../config/cache';

/**
 *  @description Create a redis cache with turing_backend: url
 *  as the key and data as the value. Ir expires after 60 minutes
 *  @param {string} url
 *  @param {object} data
 */
export default (url, data) => {
  client.setex(`backend: ${url}`, 3600, JSON.stringify(data));
};
