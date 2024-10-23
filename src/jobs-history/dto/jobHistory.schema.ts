import { JobResourceSchema } from '@base/jobs/dto/job.schema';
import { z } from 'zod';

export const JobHistoryResourceSchema = z
  .object({
    id: z.number(),
    job: JobResourceSchema,
    job_data: z.object({}),
    created_at: z.date(),
    updated_at: z.date(),
  })
  .required();

export const CreateJobHistorySchema = JobHistoryResourceSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  job: true,
}).merge(z.object({ job_id: z.number() }));

export type CreateJobHistoryType = z.infer<typeof CreateJobHistorySchema>;
export type JobHistoryResourceType = z.infer<typeof JobHistoryResourceSchema>;
