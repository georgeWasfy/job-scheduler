import { JobType } from '@base/job-types/models/JobType.model';
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

@Table({ timestamps: true, tableName: 'jobs' })
export class Job extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column(DataType.STRING)
  name: string;

  @ForeignKey(() => JobType)
  @Column(DataType.INTEGER)
  job_type_id: number;

  @BelongsTo(() => JobType)
  jobType: JobType;

  @Column(DataType.STRING)
  last_run_status: string;

  @Column(DataType.STRING)
  time_interval: string;

  @Column(DataType.BOOLEAN)
  is_recurring: string;

  @Column(DataType.JSONB)
  extra_attributes: string;

  @Column(DataType.DATE)
  last_run_at: Date;

  @Column(DataType.DATE)
  next_run_at: Date;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
