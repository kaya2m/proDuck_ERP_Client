import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, @Inject("BASE_URL") private baseUrl: string) { }

  private url(requestParam: Partial<RequestParams>): string {
    return `${requestParam.baseUrl ? requestParam.baseUrl : this.baseUrl}/${requestParam.controller}${requestParam.action ? `/${requestParam.action}` : ''}`;
  }

  get<T>(requestParams: Partial<RequestParams>, id?: string): Observable<T> {
    let url: string = "";

    if (requestParams.fullEndPoint) {
      url = requestParams.fullEndPoint;
    } else {
      url = `${this.url(requestParams)}${id ? "/" + id : ""}${requestParams.queryString ? `?${requestParams.queryString}` : ''}`;

    }

    return this.httpClient.get<T>(url, { headers: requestParams.headers });
  }

  post<T>(requestParams: Partial<RequestParams>, body: Partial<T>): Observable<T> {
    let url: string = "";
    if (requestParams.fullEndPoint) {
      url = requestParams.fullEndPoint;
    } else {
      url = `${this.url(requestParams)}${requestParams.queryString ? `?${requestParams.queryString}` : ''}`;
    }
    return this.httpClient.post<T>(url, body, { headers: requestParams.headers });
  }

  put<T>(requestParams: Partial<RequestParams>, body: Partial<T>): Observable<T> {
    let url: string = "";
    if (requestParams.fullEndPoint) {
      url = requestParams.fullEndPoint;
    } else {
      url = `${this.url(requestParams)}${requestParams.queryString ? `?${requestParams.queryString}` : ''}`;
    }
    return this.httpClient.put<T>(url, body, { headers: requestParams.headers });
  }

  delete<T>(requestParameter: Partial<RequestParams>, id: string): Observable<T> {
    let url: string = "";
    if (requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint;
    else
      url = `${this.url(requestParameter)}/${id}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;

    return this.httpClient.delete<T>(url, { headers: requestParameter.headers });
  }
}

export class RequestParams {
  controller?: string;
  action?: string;
  queryString?: string;

  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndPoint?: string;
}
