import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Cron } from '@nestjs/schedule';
import { Job } from './models/job.model';
import { Op } from 'sequelize';
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
    const now = new Date();
    const oneMinuteLater = new Date(now.getTime() + 60000);
    const jobsToSchedule = await Job.findAll({
      where: {
        [Op.or]: [
          { next_run_at: { [Op.lte]: oneMinuteLater } },
          { next_run_at: null },
        ],
        is_recurring: true
      },
    });
    for (let index = 0; index < jobsToSchedule.length; index++) {
      const job = jobsToSchedule[index];
        const pendingJob = {
          job_id: job.id,
          status: 'pending',
          next_run_at: new Date(now.getTime() + (job.interval_minutes * 60000)),
        };

        pendingJobs.push(pendingJob);
    }
    await PendingJob.bulkCreate(pendingJobs);
    for (let index = 0; index < jobsToSchedule.length; index++) {
      const job = jobsToSchedule[index];
      const jobToUpdate = pendingJobs.find(pj => pj.job_id === job.id)
      await Job.update({next_run_at: jobToUpdate?.next_run_at}, { where: { id: job.id } });
    }
  }

  // Every second Run
  @Cron('* * * * * *')
  async dispatchJobEvent() {
    const now = new Date();
    const pendingJobs = await PendingJob.findAll({
      where: {
        next_run_at: { [Op.lte]: now.toISOString() },
        status: 'pending'
      },
      include: [{ model: Job, include: [{ model: JobType }] }],
    });
    for (let index = 0; index < pendingJobs.length; index++) {
      const pendingJob = pendingJobs[index];
      await PendingJob.update({status: 'in-progress'},{where: {id: pendingJob.id}})
      this.events.emit(
        'job.dispatch',
        new JobDispatchEvent(pendingJob),
      );
    }
  }
}
