import { BadRequestException, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { CreateJobHistoryType } from './dto/jobHistory.schema';
import { JobHistory } from './models/jobHistory.model';
import { Job } from '@base/jobs/models/job.model';
import { Meta } from '@base/schema/helpers.schema';

@Injectable()
export class JobsHistoryService {
  constructor(private readonly sequelize: Sequelize) {}
  async create(
    createJobHistoryDto: CreateJobHistoryType,
  ): Promise<{ data: { jobHistory: JobHistory } }> {
    try {
      const jobHistory = await JobHistory.create(createJobHistoryDto);
      return { data: { jobHistory } };
    } catch (error) {
      throw new BadRequestException('Unable to create Job History');
    }
  }

  async find(job_id: number): Promise<{
    data: JobHistory[];
    meta: Meta;
  }> {
    try {
      const total = await Job.count({
        where: { job_id },
      });
      const jobHistory = await JobHistory.findAll({
        where: { job_id },
        include: [{ model: Job }],
      });
      return {
        data: jobHistory,
        meta: {
          total,
          current_page: null,
          per_page: null,
        },
      };
    } catch (error) {
      throw new BadRequestException(
        `Unable to find History for job with id ${job_id}`,
      );
    }
  }
}
