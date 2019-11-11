import { get } from './networkRequest';

/**
 * @description This function returns the result of a network request
 *  to Facebook api to verify a customer accessToken
 *
 * @param {string} accessToken
 * @returns An object containing the user's name and email
 */
export default access_token => {
  return get(`https://graph.facebook.com/me?fields=name,email&access_token=${access_token}`);
};
