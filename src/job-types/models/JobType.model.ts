import {
  Table,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  Model,
  HasMany,
  DefaultScope,
} from 'sequelize-typescript';

@Table({ timestamps: true, tableName: 'job_types' })


export class JobType extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.JSONB)
  validation_schema: object;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
