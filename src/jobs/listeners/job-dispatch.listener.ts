import { JobTypeService } from '@base/job-types/jobType.service';
import { JobType } from '@base/job-types/models/JobType.model';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class JobDispatchListener {
  constructor(private readonly jobTypeService: JobTypeService) {}

  @OnEvent('job.dispatch')
  async handleJob(event: { jobType: JobType }) {
    const { jobType } = event;
    switch (jobType.name) {
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
  }
}
