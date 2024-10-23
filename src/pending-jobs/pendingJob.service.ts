import { Injectable } from '@nestjs/common';
import { PendingJob } from './models/PendingJob.model';

@Injectable()
export class PendingJobsService {
  constructor() {}
  async remove(id: number): Promise<{ data: { removed: boolean } }> {
    const destroyedRows = await PendingJob.destroy({ where: { id } });
    return { data: { removed: destroyedRows > 0 } };
  }
}
