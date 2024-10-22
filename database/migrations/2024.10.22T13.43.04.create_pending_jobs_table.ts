import { DataTypes, literal } from 'sequelize';
import { Migration } from '../../umzug';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('pending_jobs', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    job_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'jobs',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    status: {
      type: DataTypes.STRING,
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
              BEFORE UPDATE ON pending_jobs
              FOR EACH ROW EXECUTE PROCEDURE update_updated_at();
            `);
};

export const down: Migration = async ({ context: sequelize }) => {
  // Drop the trigger and function first
  await sequelize.query(`
          DROP TRIGGER IF EXISTS set_updated_at ON pending_jobs;
        `);
  await sequelize.getQueryInterface().dropTable('pending_jobs');
};
