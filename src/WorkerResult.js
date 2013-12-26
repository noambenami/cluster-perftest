/**
 * Created by MuleSoft.
 * Mulee: noam.benami
 * Date: 12/23/13
 * Time: 12:48 PM
 */
'use strict';
var arrayUtils = require('./ArrayUtils.js');

/**
 * Represents the set of results from a single worker
 */
exports = module.exports = function WorkerResult(source) {

  this.results = source ? source.results : [];

  this.record = function record(output, elapsedMS) {
    this.results.push({ output: output, elapsedMS: elapsedMS });
  };

  this.getSumOutput = function getSumOutput() {
    return arrayUtils.sum(this.results, 'output');
  };

  this.getAvgOutput = function getAvgOutput() {
    return arrayUtils.avg(this.results, 'output');
  };

  this.getSumElapsedMS = function getSumElapsedMS() {
    return arrayUtils.sum(this.results, 'elapsedMS');
  };

  this.getAvgElapsedMS = function getAvgElapsedMS() {
    return arrayUtils.avg(this.results, 'elapsedMS');
  };
};
