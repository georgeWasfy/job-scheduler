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

@Table({ timestamps: true, tableName: 'pending_jobs' })
export class PendingJob extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column(DataType.STRING)
  status: string;

  @ForeignKey(() => Job)
  @Column(DataType.INTEGER)
  job_id: number;

  @BelongsTo(() => Job)
  job: Job;

  @Column(DataType.DATE)
  next_run_at: Date;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
