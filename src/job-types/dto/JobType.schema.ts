import { z } from 'zod';

const now = new Date();
export const JobTypeResourceSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    validation_schema: z.object({}).optional(),
    created_at: z.date(),
    updated_at: z.date(),
  })
  .required();

export type JobTypeResourceType = z.infer<typeof JobTypeResourceSchema>;
