/**
 *
 * @module transform
 */
;(function () {
  'use strict'

  var _ = require('lodash')

  var dataSets = require('./data-sets')

  module.exports = {
    aggregate: aggregate
  }

  /**
   * @typedef {Function} operator a function for aggregating
   * @param {Array} array input values
   * @return {*} the resulting value
   */

  /**
   * Compute aggregates for each column in the dataSet, grouped by options.by.
   * Uses options.operator to calculate aggregate. options.operator should
   * compute a value based on an array of values.
   *
   * @param {Object} options all function parameters
   * @param {Array<Object>} options.dataSet input dataSet
   * @param {operator} options.operator used to compute aggregate values
   * @param {String} options.by which column to group by
   * @return {Array<Object>} resulting dataSet
   */
  function aggregate (options) {
    var dataSet = options.dataSet

    var columns = _.keys(dataSet[0])

    var groups = _.groupBy(dataSet, options.by)

    return _.keys(groups).map(function (key) {
      var subDataSet = groups[key]

      var aggregates = columns.reduce(function (accumulator, key) {
        var column = dataSets.getColumn({
          column: key,
          dataSet: subDataSet
        })

        column = column.filter(function (value) {
          return value != null
        })

        accumulator[key] = options.operator(column)

        return accumulator
      }, {})

      aggregates[options.by] = key

      return aggregates
    })
  }
}())
