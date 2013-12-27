/**
 * Created by MuleSoft.
 * Mulee: noam.benami
 * Date: 12/26/13
 * Time: 3:43 PM
 */
'use strict';
var utils = require('../src/ArrayUtils.js');

describe('ArrayUtils', function() {
  describe('sum', function() {
    it('should sum up numbers correctly', function() {
      utils.sum([1,2,3,4]).should.equal(10);
    });
    it('should return 0 for empty arrays', function() {
      utils.sum([]).should.equal(0);
    });
    it('should be able to sum object properties', function() {
      utils.sum([{x:1}, {x:2}, {x:3}, {x:4}], 'x').should.equal(10);
    });
  });

  describe('avg', function() {
    it('should average up numbers correctly', function() {
      utils.avg([1,2,3,4]).should.equal(2.5);
    });
    it('should return 0 for empty arrays', function() {
      utils.avg([]).should.equal(0);
    });
    it('should be able to average object properties', function() {
      utils.avg([{x:1}, {x:2}, {x:3}, {x:4}], 'x').should.equal(2.5);
    });
  });
});