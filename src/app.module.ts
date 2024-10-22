import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from '../config/database.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { JobType } from './job-types/models/JobType.model';
import { Job } from './jobs/models/job.model';
import { JobsModule } from './jobs/jobs.module';
import { PendingJob } from './pending-jobs/models/PendingJob.model';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    ScheduleModule.forRoot(),
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
        models: [JobType, Job, PendingJob],
        logging: false,
      }),
      inject: [ConfigService],
    }),
    JobsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
