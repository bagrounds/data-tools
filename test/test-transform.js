/**
 * Tests for transform
 */
;(function () {
  /* global describe, it */
  'use strict'

  /**
   * Imports
   */
  var expect = require('chai').expect

  var transform = require('../lib/transform')

  var _ = require('lodash')

  console.log(JSON.stringify(transform.aggregate))

  /**
   * Tests
   */
  describe('transform', function () {
    describe('aggregate', function () {
      var dataSet = [
        {a: 1, b: 2, l: 'a'},
        {a: 3, b: 4, l: 'b'},
        {a: 2, b: null, l: 'a'},
        {a: 5, b: 6, l: 'a'},
        {a: null, b: 3, l: 'b'},
        {a: 7, b: 8, l: 'b'}
      ]

      it('adds columns', function () {
        var expectedResult = [
          {a: 8, b: 8, l: 'a'},
          {a: 10, b: 15, l: 'b'}
        ]

        var operator = function (array) {
          return array.reduce(function (sum, value) {
            return sum + value
          }, 0)
        }

        var options = {
          dataSet: _.cloneDeep(dataSet),
          by: 'l',
          operator: operator

        }

        var result = transform.aggregate(options)

        expect(result).to.deep.equal(expectedResult)
      })
      it('multiplies columns', function () {
        var expectedResult = [
          {a: 10, b: 12, l: 'a'},
          {a: 21, b: 96, l: 'b'}
        ]

        var operator = function (array) {
          return array.reduce(function (sum, value) {
            return sum * value
          }, 1)
        }

        var options = {
          dataSet: _.cloneDeep(dataSet),
          by: 'l',
          operator: operator

        }

        var result = transform.aggregate(options)

        expect(result).to.deep.equal(expectedResult)
      })
      it('counts columns', function () {
        var expectedResult = [
          {a: 3, b: 2, l: 'a'},
          {a: 2, b: 3, l: 'b'}
        ]

        var operator = function (array) {
          return array.reduce(function (sum, value) {
            if (value != null) {
              sum += 1
            }

            return sum
          }, 0)
        }

        var options = {
          dataSet: _.cloneDeep(dataSet),
          by: 'l',
          operator: operator

        }

        var result = transform.aggregate(options)

        expect(result).to.deep.equal(expectedResult)
      })
    })
  })
})()
