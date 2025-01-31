import { Injectable } from '@nestjs/common';
import { Worker } from 'worker_threads';

@Injectable()
export class WorkerService {
  async runWorker(jobtype: string): Promise<any> {
    let workerScriptPath = '';
    switch (jobtype) {
      case 'Increment':
        workerScriptPath = './src/worker-scripts/increment-script.js';
        break;
      case 'Decrement':
        workerScriptPath = './src/worker-scripts/decrement-script.js';
        break;
      default:
        break;
    }
    return new Promise((resolve, reject) => {
      const worker = new Worker(workerScriptPath);

      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });
  }
}
