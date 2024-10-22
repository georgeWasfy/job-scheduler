import { PaginatedRequestSchema } from '@base/schema/helpers.schema';
import { z } from 'zod';

export const JobResourceSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    job_type_id: z.number(),
    last_run_status: z.string(),
    time_interval: z.string(),
    is_recurring: z.boolean(),
    extra_attributes: z.object({}),
    last_run_at: z.date(),
    next_run_at: z.date(),
    created_at: z.date(),
    updated_at: z.date(),
  })
  .required();

export const CreateJobSchema = JobResourceSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  next_run_at: true,
  last_run_status: true,
  last_run_at: true,
});

export const UpdateJobSchema = CreateJobSchema.partial();

export const JobQuerySchema = z.object({
  paging: PaginatedRequestSchema.optional(),
});

export type CreateJobType = z.infer<typeof CreateJobSchema>;
export type UpdateJobType = z.infer<typeof UpdateJobSchema>;
export type JobResourceType = z.infer<typeof JobResourceSchema>;
export type JobQueryType = z.infer<typeof JobQuerySchema>;
