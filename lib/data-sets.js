/**
 * Example helper module for serve-function-module-template
 *
 * @module data-sets
 */
;(function () {
  'use strict';

  /***************************************************************************
   * Imports
   */
  var _ = require('lodash');

  /** @alias data-sets */
  module.exports = {
    makeTabular: makeTabular,
    columnOperator: columnOperator,
    getColumn: getColumn,
    setColumn: setColumn
  };

  /***************************************************************************
   * Define functions
   */

  /**
   *
   *
   * @param {Array<Object>} data to be formatted
   * @returns {Array<Object>} formatted data
   */
  function makeTabular(data) {

    // get all keys used in data set
    var allKeys = data.reduce(function(accumulator,datum){

      var keys = _.keys(datum);

      keys.forEach(function(key){
        accumulator[key] = null;
      });

      return accumulator;
    },{});

    // fill in all existing values in standardized objects
    data = data.map(function(datum){

      var keys = _.keys(datum);

      var standardObject = _.cloneDeep(allKeys);

      keys.forEach(function(key){
        standardObject[key] = datum[key];
      });

      return standardObject;
    });

    return data;
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
  function columnOperator(options){

    var dataSet = options.dataSet;
    var operator = options.operator;
    var inputColumns = options.inputColumns;
    var outputColumn = options.outputColumn;

    dataSet = dataSet.map(function(datum) {

      var inputs = inputColumns.map(function(inputColumn){

        return datum[inputColumn];
      });

      datum[outputColumn] = operator(inputs);

      return datum;
    });

    return dataSet;
  }

  /**
   *
   * @param {Object} options all function arguments
   * @param {Array<Object>} options.dataSet to operate on
   * @param {String} options.column to get
   * @return {Array} column values
   */
  function getColumn(options){

    var dataSet = options.dataSet;
    var column = options.column;

    return dataSet.map(function(datum){

      return datum[column];
    });
  }

  /**
   *
   * @param {Object} options all function arguments
   * @param {Array<Object>} options.dataSet to operate on
   * @param {String} options.column name of the new column
   * @param {Array} options.values the new column
   * @return {Array<Object>} data set with new column values
   */
  function setColumn(options){

    var dataSet = options.dataSet;
    var column = options.column;
    var values = options.values;

    dataSet = dataSet.map(function(datum, index){

      datum[column] = values[index];

      return datum;
    });

    return dataSet;
  }
})();