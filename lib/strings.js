/**
 *
 *
 * @module strings
 */
;(function () {
  'use strict';

  /***************************************************************************
   * Imports
   */

  module.exports = {
    parseNumber: parseNumber
  };

  /***************************************************************************
   * Define functions
   */

  /**
   *
   * @param {Object} options to be formatted
   * @param {String} options.string to parse
   * @param {Boolean} options.fromFront parse the number from front of String?
   * @returns {Number} result
   */
  function parseNumber(options) {

    if( options.fromFront ){
      return parseInt(options.string);
    }

    return null;
  }
})();