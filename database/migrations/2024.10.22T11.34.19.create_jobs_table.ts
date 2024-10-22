import { DataTypes, literal } from 'sequelize';
import { Migration } from '../../umzug';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('jobs', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    job_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'job_types',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    last_run_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    interval_minutes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_recurring: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    extra_attributes: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    last_run_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    next_run_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: literal('CURRENT_TIMESTAMP'),
    },
  });
  // Create the trigger that uses the function
  await sequelize.query(`
              CREATE TRIGGER set_updated_at
              BEFORE UPDATE ON jobs
              FOR EACH ROW EXECUTE PROCEDURE update_updated_at();
            `);
};

export const down: Migration = async ({ context: sequelize }) => {
  // Drop the trigger and function first
  await sequelize.query(`
          DROP TRIGGER IF EXISTS set_updated_at ON jobs;
        `);
  await sequelize.getQueryInterface().dropTable('jobs');
};
