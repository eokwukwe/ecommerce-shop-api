/**
 * @description - Method to validate the id param for all request that includes
 *   an Id params
 *
 * @param {object} req - request sent to the server
 * @param {object} res - response gotten from the server
 * @param {function} next - callback function to continue execution
 * @returns {object} - object representing response message
 */
export default (req, res, next) => {
  const { id } = req.params;
  if (id && isNaN(id)) {
    return res.status(400).json({
      code: 'USR_09',
      message: 'The ID is not a number',
      status: 400,
    });
  }
  return next();
};
