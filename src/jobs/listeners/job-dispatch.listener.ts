import { WorkerService } from '@base/job-types/jobType.worker.service';
import { JobsHistoryService } from '@base/jobs-history/jobsHistory.service';
import { PendingJob } from '@base/pending-jobs/models/PendingJob.model';
import { PendingJobsService } from '@base/pending-jobs/pendingJob.service';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { JobsService } from '../jobs.service';

@Injectable()
export class JobDispatchListener {
  constructor(
    private readonly workerService: WorkerService,
    private readonly pendingJobService: PendingJobsService,
    private readonly jobsHistoryService: JobsHistoryService,
    private readonly jobService: JobsService,

  ) {}

  @OnEvent('job.dispatch')
  async handleJob(event: { pendingJob: PendingJob }) {
    const { pendingJob } = event;
    const result = await this.workerService.runWorker(
      pendingJob.job.jobType.name,
    );
    await this.jobService.update(pendingJob.job.id, {last_run_at: new Date(), last_run_status: 'successful'})
    await this.jobsHistoryService.create({
      job_data: { value: result },
      job_id: pendingJob.job.id,
    });
    await this.pendingJobService.remove(pendingJob.id);
  }
}
