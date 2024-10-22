import { JobType } from '@base/job-types/models/JobType.model';

export class JobDispatchEvent {
  constructor(public readonly jobType: JobType) {}
}
