import {
  Controller,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { JobsHistoryService } from './jobsHistory.service';
import {
  JobHistoryResourceSchema,
} from './dto/jobHistory.schema';
import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  ListingResourceToOpenApiSchema,
} from '@base/openapi/openapi.helpers';
import { PagingSchema } from '@base/jobs/dto/job.schema';

@ApiTags('Jobs-History')
@Controller({ version: '1', path: 'jobs-history' })
export class JobsHistoryController {
  constructor(private readonly jobsHistoryService: JobsHistoryService) {}

  @Get(':id')
  @ApiResponse({
    description: 'List All Jobs',
    schema: ListingResourceToOpenApiSchema(JobHistoryResourceSchema, PagingSchema),
    status: 200,
  })
  async findOne(@Param('id') id: string) {
    const job = await this.jobsHistoryService.find(+id);
    if (!job) {
      throw new NotFoundException('Job History Not Found');
    }
    return job;
  }


}
