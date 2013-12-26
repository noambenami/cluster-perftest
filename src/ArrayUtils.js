/**
 * Exposes a number of simple, useful operations on arrays that contain objects.
 *
 * Created by MuleSoft.
 * Mulee: noam.benami
 * Date: 12/23/13
 * Time: 1:24 PM
 */
'use strict';

var _ = require('lodash');

/**
 * @param {Array} arr Array containing objects to operate over
 * @param {String} [prop] The property or function to sum, e.g. 'price'.
 *                        If not provided array is assumed to be numbers.
 * @returns {Number} Sum of property over all elements in the array
 */
exports.sum = function sum(arr, prop) {
    return arr
      .map(function(item) { return prop ? item[prop] : item; })
      .reduce(function(prev, curr) { return prev + curr; });
  };

/**
 * @param {Array} arr Array containing objects to operate over
 * @param {String} [prop] The property or function to average, e.g. 'price'.
 *                        If not provided array is assumed to be numbers.
 * @returns {Number} Average of property over all elements in the array
 */
exports.avg = function avg(arr, prop) {
  var sum = exports.sum(arr, prop);
  return  sum / arr.length;
};