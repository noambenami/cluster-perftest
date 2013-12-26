/**
 * Created by MuleSoft.
 * Mulee: noam.benami
 * Date: 12/23/13
 * Time: 12:40 PM
 */
'use strict';

var WorkerResult = require('./WorkerResult');
var hrTimer = require('./HighResTimer');

exports.run = function run(modulePath, funcName, loopCount) {
  //We use require.main.require so as to make paths relative to the
  //main index.js, not to the folder this js file is in:
  this.module = require.main.require(modulePath);
  this.func = this.module[funcName];

  //Set up the cluster workers
  //Execute the results, collecting metrics along the way:
  var results = new WorkerResult();
  for (var i = 1; i <= loopCount; i++) {
    var result = hrTimer.execute(this.func);
    results.record(result.output, result.elapsedMS);
  }
  //Notify the cluster master that we're done:
  return results;
};
