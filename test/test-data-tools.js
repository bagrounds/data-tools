/**
 * Tests for serve-function-module-template
 */
;(function () {
  /* global describe, it */
  'use strict'

  /**
   * Imports
   */
  var expect = require('chai').expect

  var dataTools = require('../data-tools')

  /**
   * Tests
   */
  describe('data-tools', function () {
    describe('preprocess', function () {
      it('should preprocess data', function () {
        expect(dataTools).to.be.ok
      })
    })
  })
})()
