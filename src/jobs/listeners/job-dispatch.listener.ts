import { WorkerService } from '@base/job-types/worker.service';
import { PendingJob } from '@base/pending-jobs/models/PendingJob.model';
import { PendingJobsService } from '@base/pending-jobs/pendingJob.service';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class JobDispatchListener {
  constructor(
    private readonly workerService: WorkerService,
    private readonly pendingJobService: PendingJobsService,
  ) {}

  @OnEvent('job.dispatch')
  async handleJob(event: { pendingJob: PendingJob }) {
    const { pendingJob } = event;
    const result = await this.workerService.runWorker(pendingJob.job.jobType.name);
    console.log("🚀 ~ JobDispatchListener ~ handleJob ~ result:", result)
    await this.pendingJobService.remove(pendingJob.id);
  }
}
