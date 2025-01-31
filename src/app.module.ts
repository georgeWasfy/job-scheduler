import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from '../config/database.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { JobType } from './job-types/models/JobType.model';
import { Job } from './jobs/models/job.model';
import { JobsModule } from './jobs/jobs.module';
import { PendingJob } from './pending-jobs/models/PendingJob.model';
import { ScheduleModule } from '@nestjs/schedule';
import { JobTypeModule } from './job-types/jobType.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PendingJobsModule } from './pending-jobs/pendingJob.module';
import { JobsHistoryModule } from './jobs-history/jobsHistory.module';
import { JobHistory } from './jobs-history/models/jobHistory.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: configService.get('DATABASE.DRIVER'),
        replication: {
          read: [
            {
              host: configService.get('DATABASE.HOST_READ'),
              port: configService.get('DATABASE.PORT'),
              username: configService.get('DATABASE.USER'),
              password: configService.get('DATABASE.PASS'),
            },
          ],
          write: {
            host: configService.get('DATABASE.HOST_WRITE'),
            port: configService.get('DATABASE.PORT'),
            username: configService.get('DATABASE.USER'),
            password: configService.get('DATABASE.PASS'),
          },
        },
        database: configService.get('DATABASE.NAME'),
        models: [JobType, Job, PendingJob, JobHistory],
        logging: false,
      }),
      inject: [ConfigService],
    }),
    JobsModule,
    JobTypeModule,
    PendingJobsModule,
    JobsHistoryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
