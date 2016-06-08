/**
 *
 * @module filter
 */
;(function () {
  'use strict'

  var _ = require('lodash')

  var typeCheck = require('type-check').typeCheck
  var dataSets = require('./data-sets')

  module.exports = {
    filterColumns: filterColumns
  }

  /**
   * Filter columns from a dataSet. Specify keepKeys or rejectKeys.
   *
   * @param {Object} options all function parameters
   * @param {Array<Object>} options.dataSet input dataSet
   * @param {Array<String>} [options.rejectKeys] keys not to keep
   * @param {Array<String>} [options.keepKeys] keys to keep
   *
   * @return {Array<Object>} resulting dataSet
   */
  function filterColumns (options) {
    var error = invalidFilterColumnOptions(options)

    if (error) throw error

    var dataSet = options.dataSet

    var keepKeys = options.keepKeys

    if (!keepKeys) {
      keepKeys = _.difference(_.keys(dataSet[0]), options.rejectKeys)
    }

    return dataSet.map(function (row) {
      var newRow = {}

      keepKeys.forEach(function (key) {
        _.set(newRow, key, _.get(row, key))
      })

      return newRow
    })
  }

  /**
   *
   * @param {Object} options all function parameters
   * @param {Array<Object>} options.dataSet input dataSet
   * @param {Array<String>} [options.rejectKeys] keys not to keep
   * @param {Array<String>} [options.keepKeys] keys to keep
   *
   * @return {Error} if options are invalid
   */
  function invalidFilterColumnOptions (options) {
    var filterCriteria = options.rejectKeys || options.keepKeys

    if (!filterCriteria) {
      return new Error('must provide rejectKeys or keepKeys!')
    }

    if (!typeCheck('[String]', filterCriteria)) {
      return new Error('filter criteria should be an array of strings!')
    }

    var invalidDataSetOptions = {
      dataSet: options.dataSet
    }

    if (dataSets.isInvalidDataSet(invalidDataSetOptions)) {
      return new Error('invalid dataSet!')
    }

    return null
  }
})()
