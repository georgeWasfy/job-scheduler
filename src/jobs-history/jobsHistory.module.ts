import { Module } from '@nestjs/common';
import { JobsHistoryController } from './jobsHistory.controller';
import { JobsHistoryService } from './jobsHistory.service';

@Module({
  controllers: [JobsHistoryController],
  providers: [JobsHistoryService],
  exports: [JobsHistoryService],
})
export class JobsHistoryModule {}
