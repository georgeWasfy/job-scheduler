import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Cron } from '@nestjs/schedule';
import { Job } from './models/job.model';
import { Op, where } from 'sequelize';
import { PendingJob } from '@base/pending-jobs/models/PendingJob.model';
import { JobDispatchEvent } from './events/job-dispatch.event';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JobType } from '@base/job-types/models/JobType.model';

@Injectable()
export class JobsDispatchService {
  constructor(
    private readonly sequelize: Sequelize,
    private readonly events: EventEmitter2,
  ) {}

  // Every minute Run
  @Cron('* * * * *')
  async populatePendingJobsTable() {
    let pendingJobs = [];
    let firstPendingJobs = [];
    const now = new Date();
    const oneMinuteLater = new Date(now.getTime() + 60000);
    const jobsToSchedule = await Job.findAll({
      where: {
        [Op.or]: [
          { next_run_at: { [Op.lte]: oneMinuteLater } },
          { last_run_at: null },
        ],
      },
    });
    for (let index = 0; index < jobsToSchedule.length; index++) {
      const job = jobsToSchedule[index];
      // First time to Run
      if (job.last_run_at === null) {
        const firstRunData = {
          job_id: job.id,
          status: 'pending',
          next_run_at: new Date(now.getTime() + job.interval_minutes * 60000),
        };

        pendingJobs.push(firstRunData);
        firstPendingJobs.push({ ...firstRunData, id: job.id });
      } else {
        const pendingJobData = {
          job_id: job.id,
          status: 'pending',
          next_run_at: job.next_run_at,
        };
        pendingJobs.push(pendingJobData);
      }
    }
    await PendingJob.bulkCreate(pendingJobs);
    for (let index = 0; index < firstPendingJobs.length; index++) {
      const element = firstPendingJobs[index];
      await Job.update(element, { where: { id: element.id } });
    }
  }

  // Every second Run
  @Cron('* * * * * *')
  async dispatchJobEvent() {
    const now = new Date();
    const oneMinuteLater = new Date(now.getTime() + 60000);
    const pendingJobs = await PendingJob.findAll({
      where: {
        next_run_at: { [Op.lte]: oneMinuteLater.toISOString() },
      },
      include: [{ model: Job, include: [{ model: JobType }] }],
    });
    for (let index = 0; index < pendingJobs.length; index++) {
      const element = pendingJobs[index];
      this.events.emit(
        'job.dispatch',
        new JobDispatchEvent(element.job.jobType),
      );
    }
  }
}
