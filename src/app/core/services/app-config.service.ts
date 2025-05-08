import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private config: any;

  constructor(private http: HttpClient) {}

  loadConfig() {
    return firstValueFrom(this.http.get('/config.json')).then((config) => {
      this.config = config;
    });
  }

  get apiHost(): string {
    return this.config.apiHost;
  }

  get apiPath(): string {
    return this.config.apiPath;
  }
}
