import { Inject, Injectable } from '@angular/core';

@Injectable()
export class ApiEndpointsService {
  constructor(@Inject('path') public path: string) {}
}
