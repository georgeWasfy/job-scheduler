const { parentPort, workerData } = require('worker_threads');

function performTask() {
  let result = 0;
  for (let i = 0; i < 10000; i++) {
    result += i;
  }
  return result;
}

// Execute the task and send the result back to the main thread
const result = performTask(workerData);
parentPort.postMessage(result);