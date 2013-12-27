/**
 * Created by MuleSoft.
 * Mulee: noam.benami
 * Date: 12/26/13
 * Time: 3:43 PM
 */
'use strict';
var timerModule = require('../src/HighResTimer.js');

describe('HighResTimer', function() {
  describe('execute', function() {
    it('should be able to time a function and capture its output', function() {
      var results = timerModule.execute(function() { return 3.14; });
      results.output.should.be.equal(3.14);
      results.elapsedMS.should.be.gt(0);
    });

    it('should be able to time a block of code', function() {
      var timer = timerModule.start();
      var elapsedMS = timer.stop();
      10e10; //block of code...
      elapsedMS.should.be.gt(0);
    });
  });
});