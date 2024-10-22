import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Meta, PaginatedRequestType } from '@base/schema/helpers.schema';
import { JobType } from '@base/job-types/models/JobType.model';
import { CreateJobType, UpdateJobType } from './dto/job.schema';
import { Job } from './models/job.model';

@Injectable()
export class JobsService {
  private defaultInclude = {
    model: JobType,
    required: true,
  };
  constructor(private readonly sequelize: Sequelize) {}
  async create(createJobDto: CreateJobType): Promise<{ data: { job: Job } }> {
    try {
      const job = await Job.create(createJobDto);
      return { data: { job } };
    } catch (error) {
      throw new BadRequestException('Unable to create Job');
    }
  }

  async list(pagination?: PaginatedRequestType): Promise<{
    data: Job[];
    meta: Meta;
  }> {
    let defaultPaging = undefined;
    let defaultInclude = this.defaultInclude;
    try {
      if (
        pagination &&
        pagination.page !== null &&
        pagination.per_page !== null
      ) {
        defaultPaging = {
          offset: (pagination.page - 1) * pagination.per_page,
          limit: pagination.per_page,
        };
      }
      const total = await Job.count({
        include: defaultInclude,
      });
      const jobs = await Job.findAll({
        ...defaultPaging,
        include: defaultInclude,
      });
      return {
        data: jobs,
        meta: {
          total,
          current_page: pagination?.page ?? null,
          per_page: pagination?.per_page ?? null,
        },
      };
    } catch (error) {
      throw new BadRequestException('Unable to list Jobs');
    }
  }

  async find(id: number): Promise<{ data: { job: Job } } | null> {
    try {
      const job = await Job.findByPk(id, { include: this.defaultInclude });
      return job ? { data: { job } } : null;
    } catch (error) {
      throw new BadRequestException(`Unable to find Job with id ${id}`);
    }
  }

  async update(
    id: number,
    updateJobDto: UpdateJobType,
  ): Promise<{ data: { job: Job } } | null> {
    const job = await Job.findByPk(id);
    if (!job) {
      throw new NotFoundException(`Job with id: ${id} not found`);
    }
    try {
      const [affectedCount] = await Job.update(updateJobDto, {
        where: { id },
      });
      if (affectedCount === 0) {
        throw new NotFoundException(`Job with id: ${id} not found`);
      }
      const job = await Job.findByPk(id);
      return job ? { data: { job } } : null;
    } catch (error) {
      throw new BadRequestException(`Unable to update Job with id ${id}`);
    }
  }

  async remove(id: number): Promise<{ data: { removed: boolean } }> {
    const destroyedRows = await Job.destroy({ where: { id } });
    return { data: { removed: destroyedRows > 0 } };
  }
}
