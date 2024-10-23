import { Seeder } from '../../umzug';

const jobTypesData = [
  {
    name: 'Increment',
    validation_schema: "{}",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Decrement',
    validation_schema: "{}",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert('job_types', jobTypesData);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkDelete('job_types', { name: jobTypesData.map((b) => b.name) });
};
