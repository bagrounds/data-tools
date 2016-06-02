/**
 * Example helper module for serve-function-module-template
 *
 * @module data-sets
 */
;(function () {
  'use strict'

  /**
   * Imports
   */
  var _ = require('lodash')
  var typeCheck = require('type-check').typeCheck

  /** @alias data-sets */
  module.exports = {
    makeTabular: makeTabular,
    columnOperator: columnOperator,
    getColumn: getColumn,
    setColumn: setColumn,
    isInvalidDataSet: isInvalidDataSet,
    rowTypes: rowTypes,
    removeEmptyColumns: removeEmptyColumns,
    removeColumn: removeColumn
  }

  /**
   * Define functions
   */

  /**
   *
   * @param {Object} options all function parameters
   * @param {Array<Object>} options.dataSet to be formatted
   * @returns {Array<Object>} formatted data
   */
  function makeTabular (options) {
    var dataSet = options.dataSet

    // get all keys used in data set
    var allKeys = dataSet.reduce(function (accumulator, datum) {
      var keys = _.keys(datum)

      keys.forEach(function (key) {
        accumulator[key] = null
      })

      return accumulator
    }, {})

    // fill in all existing values in standardized objects
    dataSet = dataSet.map(function (datum) {
      var keys = _.keys(datum)

      var standardObject = _.cloneDeep(allKeys)

      keys.forEach(function (key) {
        if (datum[key] === undefined) {
          return
        }
        standardObject[key] = datum[key]
      })

      return standardObject
    })

    return dataSet
  }

  /**
   *
   * @param {Object} options all function arguments
   * @param {Array<Object>} options.dataSet to operate on
   * @param {Function} options.operator to apply column-wise
   * @param {Array<String>} options.inputColumns inputs to operator
   * @param {String} options.outputColumn put the results here
   * @return {Array<Object>} result
   */
  function columnOperator (options) {
    var dataSet = options.dataSet
    var operator = options.operator
    var inputColumns = options.inputColumns
    var outputColumn = options.outputColumn

    dataSet = dataSet.map(function (datum) {
      var inputs = inputColumns.map(function (inputColumn) {
        return datum[inputColumn]
      })

      datum[outputColumn] = operator(inputs)

      return datum
    })

    return dataSet
  }

  /**
   *
   * @param {Object} options all function arguments
   * @param {Array<Object>} options.dataSet to operate on
   * @param {String} options.column to get
   * @return {Array} column values
   */
  function getColumn (options) {
    var dataSet = options.dataSet
    var column = options.column

    return dataSet.map(function (datum) {
      return datum[column]
    })
  }

  /**
   *
   * @param {Object} options all function arguments
   * @param {Array<Object>} options.dataSet to operate on
   * @param {String} options.column name of the new column
   * @param {Array} options.values the new column
   * @return {Array<Object>} data set with new column values
   */
  function setColumn (options) {
    var dataSet = options.dataSet
    var column = options.column
    var values = options.values

    dataSet = dataSet.map(function (datum, index) {
      datum[column] = values[index]

      return datum
    })

    return dataSet
  }

  /**
   *
   * @param {Object} options contains all function parameters
   * @param {Array<Object>} options.dataSet candidate data set
   * @return {Error|Boolean} whether or not dataSet is valid
   */
  function isInvalidDataSet (options) {
    if (!options.dataSet) {
      return new Error('no dataSet provided: ' + options.dataSet)
    }

    var errors = []

    var dataSet = options.dataSet

    var rowTypesOptions0 = {
      row: dataSet[0]
    }

    var types0 = rowTypes(rowTypesOptions0)

    // check that all rows have the same types
    dataSet.forEach(function (datum, index) {
      if (_.keys(datum).length !== _.keys(types0).length) {
        errors.push(new Error('rows are not uniform length (' + index + ').'))
      }

      var rowTypesOptions = {
        row: datum
      }

      var types = rowTypes(rowTypesOptions)

      if (types.length !== types0.length) {
        var message = 'length of rows are not uniform (' + index + ').'
        errors.push(new Error(message))
      }

      // check that this row has the same types as row 0
      _.keys(types0).forEach(function (key) {
        if (types[key] !== types0[key] &&
          types[key] !== 'Null' &&
          types0[key] !== 'Null') {
          var message = 'column types are not consistent (' + index + ').'
          errors.push(new Error(message))
        }
      })
    })

    if (errors.length > 0) {
      return new Error(errors)
    } else {
      return false
    }
  }

  /**
   *
   * @param {Object} options all function parameters
   * @param {Object} options.row returns types of this
   * @returns {Object} types of each element (column) in this row
   */
  function rowTypes (options) {
    var row = options.row

    var validTypes = [
      'String',
      'Number',
      'Array',
      'Object',
      'Null'
    ]

    return _.keys(row).reduce(function (accumulator, key) {
      var type = 'unknown type'

      validTypes.forEach(function (validType) {
        if (typeCheck(validType, row[key])) {
          type = validType
        }
      })

      accumulator[key] = type

      return accumulator
    }, {})
  }

  /**
   *
   * @param {Object} options all function parameters
   * @param {Array<Object>} options.dataSet to remove columns from
   *
   * @return {Array<Object>} result without empty columns
   */
  function removeEmptyColumns (options) {
    var result = options.dataSet

    result = result.reduce(function (result, row) {
      row = _.keys(row).reduce(function (result, item) {
        if (row[item] != null) {
          result[item] = row[item]
        }

        return result
      }, {})

      result.push(row)

      return result
    }, [])

    var makeTabularOptions = {
      dataSet: result
    }

    return makeTabular(makeTabularOptions)
  }

  /**
   * Remove the specified column
   *
   * @param {Object} options all function parameters
   * @param {Array<Object>} options.dataSet to remove column from
   * @param {String} options.column to remove
   * @return {Array<Object>} result without specified column
   */
  function removeColumn (options) {
    var dataSet = options.dataSet
    var column = options.column

    return dataSet.map(function (datum) {
      return _.omit(datum, column)
    })
  }
})()
