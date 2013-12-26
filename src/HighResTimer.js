/**
 * Created by MuleSoft.
 * Mulee: noam.benami
 * Date: 12/26/13
 * Time: 2:22 PM
 */
'use strict';

/**
 * Executes a function and returns the function's output plus the number
 * of milliseconds it took to run the function.
 *
 * @param func The function to execute
 * @returns {{output: *, elapsedMS: number}}
 */
exports.execute = function execute(func) {
  var timer = exports.start();
  var output = func();
  timer.stop();
  return { output: output, elapsedMS: timer.stop() };
};

/**
 * Creates a new timer and starts it
 * @constructor
 */
exports.start = function start() {
  var timer = new exports.Timer();
  return timer.start();
};

exports.Timer = function Timer() {
  this.startTime = 0;

  /**
   * Starts the timer
   * @returns {Timer} Returns "this"
   */
  this.start = function start() {
    this.startTime = process.hrtime();
    return this;
  };

  /**
   * Stops the timer
   *
   * @returns {number} Milliseconds elapsed since timer was started.
   */
  this.stop = function stop() {
    var elapsed = process.hrtime(this.startTime);
    return (elapsed[0] * 1e9 + elapsed[1]) / 1e6;
  };
};