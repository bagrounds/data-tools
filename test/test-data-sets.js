/**
 * Tests for serve-function-module-template
 */
;(function () {
  /* global describe, it */
  'use strict';

  /***************************************************************************
   * Imports
   */
  var expect = require('chai').expect;

  var _ = require('lodash');

  var dataSets = require('../lib/data-sets');

  /***************************************************************************
   * Tests
   */
  describe('data-sets', function () {

    describe('makeTabular', function() {

      it('should make a non uniform data set tabular', function(){

        var nonUniformDataSet = [
          {},
          {a:'aa'},
          {b:'bb'},
          {c:33, d:'dd'},
          {a:'ee', b:'ff'},
          {a:'gg', c:88},
          {a:'ii', d:'jj'},
          {b:'kk', c:1212},
          {b:'mm', d:'nn'},
          {}
        ];

        var expectedUniformDataSet = [
          {a:null,b:null,c:null,d:null},
          {a:'aa',b:null,c:null,d:null},
          {a:null,b:'bb',c:null,d:null},
          {a:null,b:null,c:33,d:'dd'},
          {a:'ee',b:'ff',c:null,d:null},
          {a:'gg',b:null,c:88,d:null},
          {a:'ii',b:null,c:null,d:'jj'},
          {a:null,b:'kk',c:1212,d:null},
          {a:null,b:'mm',c:null,d:'nn'},
          {a:null,b:null,c:null,d:null}
        ];

        var uniformDataSet = dataSets.makeTabular(nonUniformDataSet);

        expect(uniformDataSet).to.deep.equal(expectedUniformDataSet);
      });
    });

    describe('lodash.sortBy',function(){

      it('should sort a data set by a column', function(){

        var dataSet = [
          {a:'d',two:2},
          {a:'b',two:4},
          {a:'a',two:5},
          {a:'c',two:3},
          {a:'e',two:1}
        ];

        var expectedSortedByA = [
          {a:'a',two:5},
          {a:'b',two:4},
          {a:'c',two:3},
          {a:'d',two:2},
          {a:'e',two:1}
        ];

        var expectedSortedByTwo =  [
          {a:'e',two:1},
          {a:'d',two:2},
          {a:'c',two:3},
          {a:'b',two:4},
          {a:'a',two:5}
        ];

        var sortedByA = _.sortBy(dataSet,'a');

        var sortedByTwo = _.sortBy(dataSet,'two');

        expect(sortedByA).to.deep.equal(expectedSortedByA);
        expect(sortedByTwo).to.deep.equal(expectedSortedByTwo);

      });
    });

    describe('getColumn', function(){

      it('should return a column as an array', function(){

        var dataSet = [
          {a:1,b:4},
          {a:3,b:2},
          {a:1,b:4},
          {a:3,b:2},
          {a:1,b:4},
          {a:3,b:2},
          {a:1,b:4}
        ];

        var expectedColumn = [1,3,1,3,1,3,1];

        var getColumnOptions = {
          dataSet: dataSet,
          column: 'a'
        };

        var column = dataSets.getColumn(getColumnOptions);

        expect(column).to.deep.equal(expectedColumn);

      });
    });

    describe('setColumn', function(){

      it('should set the value of a column', function(){

        var dataSet = [
          {a:1,b:4},
          {a:3,b:2},
          {a:1,b:4},
          {a:3,b:2},
          {a:1,b:4},
          {a:3,b:2},
          {a:1,b:4}
        ];

        var expectedDataSet = [
          {a:1,b:4,c:9},
          {a:3,b:2,c:7},
          {a:1,b:4,c:6},
          {a:3,b:2,c:3},
          {a:1,b:4,c:1},
          {a:3,b:2,c:-8},
          {a:1,b:4,c:0}
        ];

        var columnC = [9,7,6,3,1,-8,0];

        var setColumnsOptions = {
          dataSet: dataSet,
          column: 'c',
          values: columnC
        };

        var newDataSet = dataSets.setColumn(setColumnsOptions);

        expect(newDataSet).to.deep.equal(expectedDataSet);
      });
    });

    describe('columnOperator', function(){

      it('should', function(){

        function customOperator(inputs){

          return inputs.reduce(function(accumulator,value){

            return accumulator * value;
          },1);
        }

        var inputData = [
          {a:4,b:9},
          {a:32,b:7}
        ];

        var expectedOutputData = [
          {a:4,b:9,c:customOperator([4,9])},
          {a:32,b:7,c:customOperator([32,7])}
        ];

        var columnOptions = {
          dataSet: inputData,
          inputColumns: ['a','b'],
          outputColumn: 'c',
          operator: customOperator
        };

        var outputData = dataSets.columnOperator(columnOptions);

        expect(outputData).to.deep.equal(expectedOutputData);

      });
    });

    describe('isValidDataSet', function(){

      it('should recognize a valid data set', function(done){

        var validDataSet = [
          {a:'a',b:'b',c:3},
          {a:null,b:'e',c:6},
          {a:'g',b:'h',c:null}
        ];

        var options = {
          dataSet: validDataSet
        };

        dataSets.isValidDataSet(options, function(error, result){

          expect(result).to.be.true;

          done();
        });
      });

      it('should reject if row lengths differ', function(done){

        var invalidDataSet = [
          {a:'a',b:'b',c:3},
          {a:null,b:'e'},
          {a:'g',b:'h',c:null}
        ];

        var options = {
          dataSet: invalidDataSet
        };

        dataSets.isValidDataSet(options, function(error, result){

          expect(result).to.be.false;

          done();
        });
      });

      it('should reject if types in a column differ', function(done){

        var invalidDataSet = [
          {a:'a',b:'b',c:3},
          {a:null,b:5,c:6},
          {a:'g',b:'h',c:null}
        ];

        var options = {
          dataSet: invalidDataSet
        };

        dataSets.isValidDataSet(options, function(error, result){

          expect(result).to.be.false;

          done();
        });
      });

      it('should reject if column names differ', function(done){

        var invalidDataSet = [
          {a:'a',b:'b',c:3},
          {a:null,d:'e',c:6},
          {a:'g',b:'h',c:null}
        ];

        var options = {
          dataSet: invalidDataSet
        };

        dataSets.isValidDataSet(options, function(error, result){

          expect(result).to.be.false;

          done();
        });
      });
    });

    describe('rowTypes', function(){

      it('should identify types', function() {

        var row = {
          a: 1,
          b: '2',
          c: [],
          d: {},
          e: null,
          f: undefined
        };

        var expectedRowTypes = {
          a: 'Number',
          b: 'String',
          c: 'Array',
          d: 'Object',
          e: 'Null',
          f: 'unknown type'
        };

        var rowTypes = dataSets.rowTypes(row);

        expect(rowTypes).to.deep.equal(expectedRowTypes);
      });
    });
  });
})();
