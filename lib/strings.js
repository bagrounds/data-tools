/**
 *
 *
 * @module strings
 */
;(function () {
  'use strict'

  /**
   * Imports
   */

  module.exports = {
    parseNumber: parseNumber
  }

  /**
   * Define functions
   */

  /**
   *
   * @param {Object} options to be formatted
   * @param {String} options.string to parse
   * @returns {Number} result
   */
  function parseNumber (options) {
    return parseInt(options.string)
  }
})()
