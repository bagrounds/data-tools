/**
 * Tests for strings
 */
;(function () {
  /* global describe, it */
  'use strict'

  /**
   * Imports
   */
  var expect = require('chai').expect

  var strings = require('../lib/strings')

  /**
   * Tests
   */
  describe('strings', function () {
    describe('parseNumber', function () {
      it('parse a number from the front of a string', function () {
        var testString = ' 12 and other; text 3 stuff 2.'

        var expectedResult = 12

        var parseNumberOptions = {
          string: testString
        }

        var result = strings.parseNumber(parseNumberOptions)

        expect(result).to.equal(expectedResult)
      })
      it('parse 0', function () {
        var testString = '0 mins'

        var expectedResult = 0

        var parseNumberOptions = {
          string: testString
        }

        var result = strings.parseNumber(parseNumberOptions)

        expect(result).to.equal(expectedResult)
      })
    })
  })
})()
