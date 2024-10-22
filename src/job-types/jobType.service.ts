import { Injectable } from '@nestjs/common';

@Injectable()
export class JobTypeService {
  constructor() {}

  IncrementJobHandler() {
    console.log('Increment Job');
  }

  DecrementJobHandler() {
    console.log('Increment Job');
  }
  NotificationsJobHandler() {
    console.log('Notifications');
  }
}
