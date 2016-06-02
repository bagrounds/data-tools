/**
 * Convert between data formats, such as json, csv, tsv, etc
 *
 * @module format
 */
;(function () {
  'use strict'

  /* imports */
  var converter = require('json-2-csv')

  /* exports */
  module.exports = {
    jsonToCsv: jsonToCsv
  }

  /**
   * Converts a json dataSet into a csv representation. The dataSet must valid.
   * i.e.
   *
   * <p> dataSets.isInvalidDataSet(dataSet) === false
   *
   * @method jsonToCsv
   *
   * @param {Object} options all function parameters
   * @param {Array<Object>} options.dataSet a valid dataSet object
   * @param {Function} callback handle results
   * @return {String} resulting csv representation of input dataSet
   */
  function jsonToCsv (options, callback) {
    return converter.json2csv(options.dataSet, callback)
  }
})()
