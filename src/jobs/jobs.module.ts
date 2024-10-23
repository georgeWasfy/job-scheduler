import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { JobsDispatchService } from './jobs.dispatcher';
import { JobDispatchListener } from './listeners/job-dispatch.listener';
import { JobTypeModule } from '@base/job-types/jobType.module';
import { PendingJobsModule } from '@base/pending-jobs/pendingJob.module';

@Module({
  controllers: [JobsController],
  providers: [JobsService, JobsDispatchService, JobDispatchListener],
  imports: [JobTypeModule, PendingJobsModule],
})
export class JobsModule {}
