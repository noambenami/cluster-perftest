'use strict';

var cluster = require('cluster');
var testRunner = require('./src/TestRunner');
var hrTimer = require('./src/HighResTimer');
var WorkerResult = require('./src/WorkerResult');
var WorkerResults = require('./src/WorkerResults');

var workerResults = null;
var currentNumWorkersToLaunch = 1;
var maxNumWorkersToLaunch = 1;
var timer;

//--- Master:
if (cluster.isMaster) {
  var os = require('os');
  //Describe the command line arguments
  var argv = require('optimist')
    .usage('Execute a module function on [n] workers [l] times and report performance metrics')
    .demand('m')
    .options('m', { alias: 'module', describe: 'Module to require' })
    .options('f', { default: 'run', alias: 'func', describe: 'Function to call' })
    .options('n', { default: 1, alias: 'numWorkers', describe: 'Number of workers to launch' })
    .options('l', { default: 10, alias: 'loopCount', describe: 'Number of times to call the function' })
    .argv;

  console.log('Starting: %d \'%s\' cores found.', os.cpus().length, os.cpus()[0].model);
  console.log('Workers will execute method "%s" of "%s" %s times.', argv.func, argv.module, argv.loopCount);

  maxNumWorkersToLaunch = argv.numWorkers;

  //Create the maximum number of workers. We'll then farm
  //work out to the appropriate subset thereof, thereby
  //factoring out worker launch time from our computation times
  for (var i = 0; i < argv.numWorkers; i++) {
    var worker = cluster.fork();
    //Listen for messages from the worker
    worker.on('message', collectResult);
  }

  //Post the work for the workers to do:
  //We run the loop with 1 worker, then with 2 workers, then with 3, until we run it with numWorkers workers:
  launchWorkers();
}
//--- Worker:
else {
  process.on('message', runFunc);
}

//--- Support code

/**
 * Launches currentNumWorkers workers to do the work
 */
function launchWorkers() {
  workerResults = new WorkerResults();
  var workersLaunched = 0;
  timer = hrTimer.start();
  for (var id in cluster.workers) {
    cluster.workers[id].send(argv);
    workersLaunched++;
    if (workersLaunched === currentNumWorkersToLaunch) {
      return;
    }
  }
}

/**
 * Runs on worker process to execute the task that we are testing for scalability
 *
 * @param {{module: string, func: string, loopCount: number}} msg Instance of argv
 */
function runFunc(msg) {
  var results = testRunner.run(msg.module, msg.func, msg.loopCount);
  //Send results back to the master
  process.send(results);
}

/**
 *  Runs on master process to aggregate the work done by worker processes. Will relaunch the
 *  process if necessary to complete all worker count loop.
 *
 * @param {WorkerResults} result
 */
function collectResult(result) {
  //Data coming back from workers is marshaled without the prototype,
  //so here we restore the object type:
  result = new WorkerResult(result);
  workerResults.record(result);
  var numWorkersDone = workerResults.results.length;
  if (numWorkersDone === currentNumWorkersToLaunch) {
    //Report results
    workerResults.totalTimeMS = timer.stop();
    reportResults();
    if (currentNumWorkersToLaunch < maxNumWorkersToLaunch) {
      currentNumWorkersToLaunch++;
      //Run the test again with more workers
      launchWorkers();
    } else {
      shutdown();
    }
  }
}

/**
 * Reports the results of the concurrent executions to console
 */
function reportResults() {
  console.log('\n%d workers | Total time: %dms\t |  Avg time/Worker: %dms\t | Total Output: %d\t | Avg Output: %d',
    workerResults.results.length, workerResults.totalTimeMS, workerResults.getAvgElapsedMS(), workerResults.getSumOutput(), workerResults.getAvgOutput());
}

/**
 * Disconnects all of the worker threads, allowing this one to exit
 */
function shutdown() {
  console.log('\nShutting down...');
  for (var id in cluster.workers) {
    cluster.workers[id].disconnect();
  }
}