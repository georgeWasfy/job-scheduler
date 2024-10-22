import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  NotFoundException,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import {
  CreateJobSchema,
  CreateJobType,
  JobQueryType,
  UpdateJobSchema,
  UpdateJobType,
} from './dto/job.schema';
import { ValidationPipe } from '@base/pipes/validation.pipe';

@Controller({ version: '1', path: 'jobs' })
export class JobsController {
  constructor(private readonly jobService: JobsService) {}

  @Post()
  @UsePipes(new ValidationPipe(CreateJobSchema))
  async create(@Body() createJobDto: CreateJobType) {
    return await this.jobService.create(createJobDto);
  }

  @Get()
  async findAll(query: JobQueryType) {
    return await this.jobService.list(query?.paging);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const job = await this.jobService.find(+id);
    if (!job) {
      throw new NotFoundException('Job Not Found');
    }
    return job;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe(UpdateJobSchema)) updateJobDto: UpdateJobType,
  ) {
    return await this.jobService.update(+id, updateJobDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.jobService.remove(+id);
  }
}
