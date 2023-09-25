import { API_NAME, API_VERSION } from '@config/app';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): any {
    return {
      ping: true,
      name: API_NAME,
      version: API_VERSION,
    };
  }
}
