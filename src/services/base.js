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
}
