import { isDate, parse } from 'date-fns';

/**
 * Parse a string into date with provided format
 * @param {string} format - format to parse
 * @param {string} originalValue - Value to parse
 * @returns {string | date} parsedDate
 */
export function parseDateStringWithFormat(
  format: string,
  originalValue: string
): string | Date {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, format, new Date());

  return parsedDate;
}

/**
 * Parse a string into date with common format
 * aka dd/MM/yyyy (VNese format bitch)
 * @param {Date} value - Yup date value
 * @param {string} originalValue - Date to parse
 * @returns {string | date} parsedDate
 */
export function parseDateStringCommon(originalValue: string): string | Date {
  return parseDateStringWithFormat('dd/MM/yyyy', originalValue);
}

/**
 * Parse a string into common but for yup transform
 * @param {Date} value - Yup value
 * @param {string} originalValue - Yup request original value
 * @returns {string | Date} parsedDate
 */
export function yupParseDateStringCommon(
  value: Date,
  originalValue: string
): string | Date {
  return parseDateStringCommon(originalValue);
}
