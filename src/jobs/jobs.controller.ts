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
  JobResourceSchema,
  PagingSchema,
  UpdateJobSchema,
  UpdateJobType,
} from './dto/job.schema';
import { ValidationPipe } from '@base/pipes/validation.pipe';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  ApiPaginationQuery,
  ListingResourceToOpenApiSchema,
  SingleResourceToOpenApiSchema,
} from '@base/openapi/openapi.helpers';
import { PaginatedRequestSchema } from '@base/schema/helpers.schema';
@ApiTags('Jobs')
@Controller({ version: '1', path: 'jobs' })
export class JobsController {
  constructor(private readonly jobService: JobsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Create Single Job',
    status: 201,
    schema: SingleResourceToOpenApiSchema(JobResourceSchema),
  })
  @ApiBody({
    description: 'Create Single Job Body',
    schema: SingleResourceToOpenApiSchema(CreateJobSchema),
  })
  @UsePipes(new ValidationPipe(CreateJobSchema))
  async create(@Body() createJobDto: CreateJobType) {
    return await this.jobService.create(createJobDto);
  }

  @Get()
  @ApiResponse({
    description: 'List All Jobs',
    schema: ListingResourceToOpenApiSchema(JobResourceSchema, PagingSchema),
    status: 200,
  })
  @ApiPaginationQuery(PaginatedRequestSchema)
  async findAll(query: JobQueryType) {
    return await this.jobService.list(query?.paging);
  }

  @Get(':id')
  @ApiResponse({
    description: 'Get Single Job',
    schema: SingleResourceToOpenApiSchema(JobResourceSchema),
    status: 200,
  })
  async findOne(@Param('id') id: string) {
    const job = await this.jobService.find(+id);
    if (!job) {
      throw new NotFoundException('Job Not Found');
    }
    return job;
  }

  @Patch(':id')
  @ApiResponse({
    description: 'Update Single Job',
    status: 200,
  })
  @ApiBody({
    description: 'Update Single Job Body',
    schema: SingleResourceToOpenApiSchema(UpdateJobSchema),
  })
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe(UpdateJobSchema)) updateJobDto: UpdateJobType,
  ) {
    return await this.jobService.update(+id, updateJobDto);
  }

  @Delete(':id')
  @ApiResponse({
    description: 'Delete Single Job',
    status: 204,
  })
  async remove(@Param('id') id: string) {
    return await this.jobService.remove(+id);
  }
}
