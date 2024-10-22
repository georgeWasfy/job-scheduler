import { Module } from '@nestjs/common';
import { JobTypeService } from './jobType.service';

@Module({
  controllers: [],
  providers: [JobTypeService],
  exports: [JobTypeService]
})
export class JobTypeModule {}
