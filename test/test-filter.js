/**
 * Tests for filter
 */
;(function () {
  /* global describe, it */
  'use strict'

  /* Imports */
  var expect = require('chai').expect

  var filter = require('../lib/filter')

  /* Tests */
  describe('filter', function () {
    describe('filterColumns', function () {
      it('it should filter keys not in keepKeys', function () {
        var input = [
          {column1: 'a string', column2: 9, column3: null},
          {column1: 'another string', column2: 42, column3: 4}
        ]

        var expectedResult = [
          {column1: 'a string', column3: null},
          {column1: 'another string', column3: 4}
        ]

        var options = {
          dataSet: input,
          keepKeys: ['column1', 'column3']
        }

        var result = filter.filterColumns(options)

        expect(result).to.deep.equal(expectedResult)
      })
    })
  })
})()
