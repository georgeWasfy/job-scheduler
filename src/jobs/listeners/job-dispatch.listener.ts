import { JobTypeService } from '@base/job-types/jobType.service';
import { PendingJob } from '@base/pending-jobs/models/PendingJob.model';
import { PendingJobsService } from '@base/pending-jobs/pendingJob.service';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class JobDispatchListener {
  constructor(
    private readonly jobTypeService: JobTypeService,
    private readonly pendingJobService: PendingJobsService,
  ) {}

  @OnEvent('job.dispatch')
  async handleJob(event: { pendingJob: PendingJob }) {
    const { pendingJob } = event;
    switch (pendingJob.job.jobType.name) {
      case 'Increment':
        this.jobTypeService.IncrementJobHandler();
        break;
      case 'Decrement':
        this.jobTypeService.DecrementJobHandler();
        break;
      case 'Notifications':
        this.jobTypeService.NotificationsJobHandler();
        break;
      default:
        break;
    }
    await this.pendingJobService.remove(pendingJob.id);
  }
}
