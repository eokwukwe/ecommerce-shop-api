/**
 * @description - Middleware to validate that resource id is a number
 *
 * @param {object} req - request sent to the server
 * @param {object} res - response gotten from the server
 * @param {function} next - callback function to continue execution
 * @returns {object} - object representing response message
 */
export default (req, res, next) => {
  const id = Object.values(req.params)[0];
  if (id && isNaN(id)) {
    return res.status(400).json({
      code: 'USR_09',
      message: 'The resource ID must be a number',
      status: 400,
    });
  }
  return next();
};
