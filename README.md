Execute a module function on [n] workers [l] times and report performance metrics

Options:
  -m, --module      Module to require                     [required]
  -f, --func        Function to call                      [default: "run"]
  -n, --numWorkers  Number of workers to launch           [default: 1]
  -l, --loopCount   Number of times to call the function  [default: 10]

For example:
node index.js -m ./test/wait20ms -n 16