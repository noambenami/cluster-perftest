/**
 * Created by MuleSoft.
 * Mulee: noam.benami
 * Date: 12/23/13
 * Time: 12:40 PM
 */
'use strict';

var WorkerResult = require('./WorkerResult');

exports.run = function run(modulePath, funcName, loopCount) {
  this.module = require.main.require(modulePath);
  this.func = this.module[funcName];

  //Set up the cluster workers
  //Execute the results, collecting metrics along the way:
  var results = new WorkerResult();
  for (var i = 1; i <= loopCount; i++) {
    //console.log('Worker %s (%s/%s)', cluster.worker.id, i, argv.loopCount);
    var t0 = process.hrtime();
    var output = this.func();
    var elapsed = process.hrtime(t0);
    var elapsedMS = (elapsed[0] * 1e9 + elapsed[1]) / 1e6;
    results.record(output, elapsedMS);
  }
  //Notify the cluster master that we're done:
  return results;
};
