import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  constructor() {}
  async getHello() {
    
    return {
      message: 'Healthy and running Api',
    };
  }
}
