/**
 * Convert between data formats, such as json, csv, tsv, etc
 *
 * @module format
 */
;(function () {
  'use strict'

  /* imports */
  var json2csv = require('json2csv')

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
   * @param {String} [options.delimiter] default: ','
   * @param {Function} callback handle results
   * @return {String} resulting csv representation of input dataSet
   */
  function jsonToCsv (options, callback) {
    var json2csvOptions = {
      data: options.dataSet,
      quotes: '',
      defaultValue: ''
    }

    if (options.delimiter) {
      json2csvOptions.del = options.delimiter
    }

    return json2csv(json2csvOptions, callback)
  }
})()
