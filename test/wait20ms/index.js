'use strict';
var timers = require('timers');

/**
 * Most basic test for cluster-based execution; executes a function that returns in
 * roughly 1000ms.
 */
exports.run = function() {
  var nowMS = Date.now();
  while(Date.now() - nowMS < 10) {}
  return 1;
};
