/**
 *
 *
 * @module data-tools
 */
;(function () {
  'use strict'

  /**
   * imports
   */

  var typeCheck = require('type-check').typeCheck

  var dataSets = require('./lib/data-sets')
  var strings = require('./lib/strings')

  /**
   * exports
   */
  module.exports = {
    dataTools: dataTools,
    dataSets: dataSets,
    strings: strings
  }

  /**
   *
   * @function dataTools
   * @alias data-tools
   * @param {Object} options contains all function parameters
   * @param {Function} callback handles results
   */
  function dataTools (options, callback) {
    var error = invalidOptions(options)

    if (error) {
      callback(error)
      return
    }

    callback(new Error('sorry, not implemented yet'))
  }

  /**
   * Define helper functions
   */

  /**
   * Validate inputs.
   *
   * @private
   *
   * @param {Object} options contains all function parameters
   *
   * @returns {Error|Boolean} any errors due to invalid inputs
   */
  function invalidOptions (options) {
    if (!typeCheck('Object', options)) {
      var message = 'options should be an object'

      return new Error(message)
    }

    return false
  }
})()
