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
  var typeCheck = require('type-check').typeCheck;

  /** @alias data-sets */
  module.exports = {
    makeTabular: makeTabular,
    columnOperator: columnOperator,
    getColumn: getColumn,
    setColumn: setColumn,
    isValidDataSet: isValidDataSet,
    rowTypes: rowTypes
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

  /**
   *
   * @param {Object} options contains all function parameters
   * @param {Array<Object>} options.dataSet candidate data set
   * @param {Function} callback handle result
   */
  function isValidDataSet(options, callback){

    var dataSet = options.dataSet;

    var types0 = rowTypes(dataSet[0]);

    // check that all rows have the same types
    var isValid = dataSet.reduce(function(success,datum, index){

      if(_.keys(datum).length != _.keys(types0).length){
        console.error(new Error('different lengths for data[' + index + ']'));
        return false;
      }

      var types = rowTypes(datum);

      if( types.length != types0.length ){
        return false;
      }

      // check that this row has the same types as row 0
      var sameTypes = _.keys(types0).reduce(function(sameTypes,key){

        if( types[key] != types0[key] && types[key] != 'Null'){

          return false;
        }
        return sameTypes;
      }, true);

      return success && sameTypes;
    },true);

    callback(null, isValid);
  }

  /**
   *
   * @param {Object} row
   * @returns {Object} types of each element in this row
   */
  function rowTypes(row){

    var validTypes = [
      'String',
      'Number',
      'Array',
      'Object',
      'Null'
    ];

    return _.keys(row).reduce(function(accumulator, key){

      var type = 'unknown type';

      validTypes.forEach(function(validType){

        if( typeCheck(validType,row[key]) ){

          type = validType;
        }
      });

      accumulator[key] = type;

      return accumulator;
    },{});
  }

})();