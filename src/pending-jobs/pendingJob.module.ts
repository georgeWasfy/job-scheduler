import { Module } from '@nestjs/common';
import { PendingJobsService } from './pendingJob.service';

@Module({
  controllers: [],
  providers: [PendingJobsService],
  exports: [PendingJobsService],
})
export class PendingJobsModule {}
