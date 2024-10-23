import { JobType } from '@base/job-types/models/JobType.model';
import { Job } from '@base/jobs/models/job.model';
import {
  Table,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

@Table({ timestamps: true, tableName: 'jobs_history' })
export class JobHistory extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Job)
  @Column(DataType.INTEGER)
  job_id: number;

  @BelongsTo(() => Job)
  job: Job;

  @Column(DataType.JSONB)
  job_data: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
