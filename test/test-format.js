/**
 * Tests for data-tools
 */
;(function () {
  /* global describe, it */
  'use strict'

  /**
   * Imports
   */
  var expect = require('chai').expect

  var format = require('../lib/format')

  /**
   * Tests
   */
  describe('format', function () {
    describe('jsonToCsv', function () {
      it('it should convert json to csv', function (done) {
        var jsonInput = [
          {column1: 'a string', column2: 9, column3: null},
          {column1: 'another string', column2: 42, column3: null},
          {column1: 'abc', column2: null, column3: 198},
          {column1: null, column2: 98, column3: 5}
        ]

        var expectedCsvOutput = 'column1,column2,column3\n'
        expectedCsvOutput += 'a string,9,\n'
        expectedCsvOutput += 'another string,42,\n'
        expectedCsvOutput += 'abc,,198\n'
        expectedCsvOutput += ',98,5\n'

        var options = {
          dataSet: jsonInput
        }

        format.jsonToCsv(options, handleResults)

        function handleResults (error, csv) {
          expect(error).not.to.be.ok

          expect(csv).to.equal(expectedCsvOutput)

          done()
        }
      })
      it('it should convert json to tsv', function (done) {
        var jsonInput = [
          {column1: 'a string', column2: 9, column3: null},
          {column1: 'another string', column2: 42, column3: null},
          {column1: 'abc', column2: null, column3: 198},
          {column1: null, column2: 98, column3: 5}
        ]

        var expectedCsvOutput = 'column1\tcolumn2\tcolumn3\n'
        expectedCsvOutput += 'a string\t9\t\n'
        expectedCsvOutput += 'another string\t42\t\n'
        expectedCsvOutput += 'abc\t\t198\n'
        expectedCsvOutput += '\t98\t5\n'

        var options = {
          dataSet: jsonInput,
          delimiter: '\t'
        }

        format.jsonToCsv(options, handleResults)

        function handleResults (error, csv) {
          error && console.error(error)
          expect(error).not.to.be.ok

          expect(csv).to.equal(expectedCsvOutput)

          done()
        }
      })
    })
  })
})()
