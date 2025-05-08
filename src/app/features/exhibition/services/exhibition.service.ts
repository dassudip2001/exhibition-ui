import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryParamsHelper } from '../../../core/helpers/query-params.helper';
import { IRes } from '../../../core/models/core.model';
import { ApiEndpointsService } from '../../../core/services/api-endpoints.service';
import { ApiHttpService } from '../../../core/services/api-http.service';
import { UrlBuilderService } from '../../../core/services/url-builder.service';

@Injectable({
  providedIn: 'root'
})
export class ExhibitionService  extends ApiEndpointsService {
  constructor(
    protected _es: UrlBuilderService,
    protected _ahs: ApiHttpService
  ) {
    super('zones');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(query?: any): Observable<any[]> {
    if (query === undefined || Object.keys(query).length === 0) {
      return this._ahs.get<any[]>(this._es.createUrl(this.path));
    } else {
      return this._ahs.get<any[]>(
        this._es.createUrlWithQueryParameters(
          this.path,
          (qs: QueryParamsHelper) => {
            Object.keys(query).forEach((key) => {
              qs.push(key, query[key]);
            });
          }
        )
      );
    }
  }

  find(id: string | number): Observable<any> {
    return this._ahs.get(this._es.createUrlWithPathVariables(this.path, [id]));
  }

  post(data: any): Observable<IRes> {
    return this._ahs.post<IRes>(
      this._es.createUrlWithQueryParameters(this.path),
      data
    );
  }

  put(id: string | number, data: any): Observable<unknown> {
    return this._ahs.put(
      this._es.createUrlWithPathVariables(this.path, [id]),
      data
    );
  }

  delete(id: string | number): Observable<unknown> {
    return this._ahs.delete(
      this._es.createUrlWithPathVariables(this.path, [id])
    );
  }
}