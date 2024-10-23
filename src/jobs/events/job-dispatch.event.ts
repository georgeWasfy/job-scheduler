import { PendingJob } from '@base/pending-jobs/models/PendingJob.model';

export class JobDispatchEvent {
  constructor(public readonly pendingJob: PendingJob) {}
}
