import { DataTypes, literal } from 'sequelize';
import { Migration } from '../../umzug';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('job_types', {
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
    validation_schema: {
      type: DataTypes.JSONB,
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
    // Create the trigger function to update updated_at
    await sequelize.query(`
        CREATE OR REPLACE FUNCTION update_updated_at()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at := CURRENT_TIMESTAMP;
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
      `);
  
      // Create the trigger that uses the function
      await sequelize.query(`
        CREATE TRIGGER set_updated_at
        BEFORE UPDATE ON job_types
        FOR EACH ROW EXECUTE PROCEDURE update_updated_at();
      `);
};

export const down: Migration = async ({ context: sequelize }) => {
     // Drop the trigger and function first
     await sequelize.query(`
        DROP TRIGGER IF EXISTS set_updated_at ON job_types;
        DROP FUNCTION IF EXISTS update_updated_at;
      `);
  await sequelize.getQueryInterface().dropTable('job_types');
};
