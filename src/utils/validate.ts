/**
 * Validate if value is valid email
 * @param {String} value
 * @returns {boolean} Wheter value is valid emai
 */
export function validateEmail(value: any): boolean {
  // Sanitize
  if (!value) return false;

  // Build regex
  const reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // Return
  return reg.test(value.toString().toLowerCase());
}
