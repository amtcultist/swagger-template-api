import { Response } from 'express';
import log from '@/logger';

/**
 * Make boolean string into boolean
 * @param {string} str
 * @returns {boolean} Boolean from string
 */
export function checkBooleanFromString(target: any): boolean {
  // Sanitize
  if (!target) return;

  // Get string
  const str = target.toString();

  // String true case
  if (str === 'true') return true;

  // String false case
  if (str === 'false') return false;
}

/**
 * Default common error log
 * @param {Response} res
 * @param {any} err
 * @returns {Promise<Response>}
 */
export async function commonErrorLog(
  res: Response,
  err: any
): Promise<Response> {
  log.error(err);
  return res.status(500).send({
    message: err.message,
  });
}
