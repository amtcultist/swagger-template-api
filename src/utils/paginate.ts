const defaultRegex = { $exists: true };

/**
 * Return generic regex for pagination
 * @param {string} target - Target to create query on
 * @returns {FilterQuery<T>} Query to use in MongoDB
 */
export function generalPaginateRegex(target: any) {
  // Sanitizer
  if (!target) return defaultRegex;

  // Avoid overload
  const targetString = target.toString();

  // Build result in one tick
  const result =
    !targetString || targetString === ''
      ? defaultRegex
      : { $regex: `^${targetString}`, $options: 'i' };

  return result;
}

/**
 * Return whole equal (mostly use for ObjectId)
 * @param {string} target - Target to create query on
 * @returns {FilterQuery<T>} Query to use in MongoDB
 */
export function equalPaginateRegex(target: any) {
  // Sanitizer
  if (!target) return defaultRegex;

  // Avoid overload
  const targetString = target.toString();

  // Build result in one tick
  const result =
    !targetString || targetString === '' ? defaultRegex : { $eq: targetString };

  return result;
}

/**
 * Return whole equal (mostly use for ObjectId)
 * @param {string[]} target - Target to create query on
 * @returns {FilterQuery<T>} Query to use in MongoDB
 */
export function generalArrayPaginateRegex(target: any[]) {
  // Sanitizer
  if (!target) return defaultRegex;

  // Build result in one tick
  const result =
    !target || target.length === 0 ? defaultRegex : { $in: target };

  return result;
}

/**
 * Return and array cast from multitype array | single
 * @param {k | k[]} target - Target to convert to array
 * @returns {k & any[] | k[]} - Casted array
 */
export function stringOrArrayMap<k>(target: k) {
  return Array.isArray(target) ? target : [target];
}
