/**
 * Time utilities for converting different units of time to milliseconds.
 *
 * @namespace
 *
 * @example
 * ```typescript
 * Time.mins(10); // returns 600000
 * Time.hours(2); // returns 7200000
 * Time.days(1); // returns 86400000
 * ```
 */
export const Time = {
  /**
   * Forever
   *
   * @returns number
   *
   * @example
   * ```typescript
   *  Time.Forever; // returns Infinity
   * ```
   */
  Forever: Infinity,

  /**
   * Convert seconds to milliseconds.
   * Enter seconds in numbers, get the API compatible value in ms.
   *
   * @param secs number
   * @returns number
   *
   * @example
   * ```typescript
   *  Time.secs(10); // returns 10000
   * ```
   */
  secs: (secs: number): number => {
    return secs * 1000;
  },

  /**
   * Convert minutes to milliseconds.
   * Enter minutes in numbers, get the API compatible value in ms.
   *
   * @param mins number
   * @returns number
   *
   * @example
   * ```typescript
   *  Time.mins(10); // returns 600000
   * ```
   */
  mins: (mins: number): number => {
    return mins * 60 * 1000;
  },

  /**
   * Convert hours to milliseconds.
   * Enter hours in numbers, get the API compatible value in ms.
   *
   * @param hours number
   * @returns number
   *
   * @example
   * ```typescript
   *  Time.hours(10); // returns 36000000
   * ```
   */
  hours: (hours: number): number => {
    return hours * 60 * 60 * 1000;
  },

  /**
   * Convert days to milliseconds.
   * Enter days in numbers, get the API compatible value in ms.
   *
   * @param days number
   * @returns number
   *
   * @example
   * ```typescript
   *  Time.days(10); // returns 864000000
   * ```
   */
  days: (days: number): number => {
    return days * 60 * 60 * 1000 * 24;
  },
};
