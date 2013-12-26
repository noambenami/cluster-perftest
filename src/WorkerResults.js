/**
 * Created by MuleSoft.
 * Mulee: noam.benami
 * Date: 12/23/13
 * Time: 12:48 PM
 */
'use strict';
var arrayUtils = require('./ArrayUtils.js');

/**
 * Represents the set of results from a set of workers
 */
exports = module.exports = function WorkerResults() {

  this.results = [];

  this.record = function record(workerResult) {
    this.results.push(workerResult);
  };

  /**
   * Sum of all of the outputs across all worker results
   * @returns {Number}
   */
  this.getSumOutput = function getSumOutput() {
    var data = [];
    this.results.forEach(function(item) { data.push(item.getSumOutput()); });
    return arrayUtils.sum(data);
  };

  /**
   * Average of all of the output averages across all worker results
   * @returns {Number}
   */
  this.getAvgOutput = function getAvgOutput() {
    var data = [];
    this.results.forEach(function(item) { data.push(item.getAvgOutput()); });
    return arrayUtils.avg(data);
  };

  /**
   * Average of all of the elapsed time averages across all worker results
   * @returns {Number}
   */
  this.getAvgElapsedMS = function getAvgElapsedMS() {
    var data = [];
    this.results.forEach(function(item) { data.push(item.getAvgElapsedMS()); });
    return arrayUtils.avg(data);
  };
};
