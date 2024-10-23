import { Module } from '@nestjs/common';
import { WorkerService } from './jobType.worker.service';

@Module({
  controllers: [],
  providers: [WorkerService],
  exports: [WorkerService]
})
export class JobTypeModule {}
