export default class BaseService {
  /**
   * @description This creates a new instance of the model 'Model' with the payload provided
   * @param  {object} model
   * @param {object} payload
   * @returns {object} new row
   * @member BaseService
   */
  static async create(model, payload) {
    return await model.create(payload);
  }

  /**
   * @description This fetches one record from the database that matches the *  *  condition specified in the option
   * @param  {object} model
   * @param {object} option The condition for the query
   * @param {array} include Array of associated records to include
   * @returns {object} one row
   * @member BaseService
   */
  static async findOne(model, option, include = []) {
    return await model.findOne({
      where: { ...option },
      include,
    });
  }

  /**
   * @description This fetches a record from the database by ID
   * @param  {object} model
   * @returns {object} one row
   * @member BaseService
   */
  static async findByPk(model, id) {
    return await model.findByPk(id);
  }

  /**
   * @description This fetches all the records from a table
   * @param  {object} model
   * @param {object} option The condition for the query and attributes required
   * @returns {object} all rows
   * @member BaseService
   */
  static async findAll(model, options = {}) {
    return await model.findAll(options);
  }
}
