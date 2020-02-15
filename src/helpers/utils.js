/**
 * Capitalize the first letter of a string
 *
 * @param {string} s The string to capitalize
 */
export const capitalize = s => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

/**
 * Generate model name from the record id key
 *
 * @param {string} recordId The string representing the id key of the record,
 * e.g. product_id, category_id etc.
 */
export const generateModelName = recordId => {
  let modelName = recordId.split('_');
  return modelName.length > 2
    ? modelName
        .slice(0, modelName.length - 1)
        .map(name => capitalize(name))
        .join('')
    : capitalize(modelName[0]);
};
