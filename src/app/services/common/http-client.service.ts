import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseDto } from '../contracts/ResponseDto';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, @Inject("BASE_URL") private baseUrl: string) { }

  private url(requestParam: Partial<RequestParams>): string {
    return `${requestParam.baseUrl ? requestParam.baseUrl : this.baseUrl}/${requestParam.controller}${requestParam.action ? `/${requestParam.action}` : ''}`;
  }

  get<T>(requestParams: Partial<RequestParams>, id?: string): Observable<ResponseDto<T>> {
    let url: string = "";

    if (requestParams.fullEndPoint) {
      url = requestParams.fullEndPoint;
    } else {
      url = `${this.url(requestParams)}${id ? "/" + id : ""}${requestParams.queryString ? `?${requestParams.queryString}` : ''}`;
    }

    return this.httpClient.get<ResponseDto<T>>(url, { headers: requestParams.headers });
  }

  post<T>(requestParams: Partial<RequestParams>, body: Partial<T>): Observable<ResponseDto<T>> {
    let url: string = "";
    if (requestParams.fullEndPoint) {
      url = requestParams.fullEndPoint;
    } else {
      url = `${this.url(requestParams)}${requestParams.queryString ? `?${requestParams.queryString}` : ''}`;
    }
    return this.httpClient.post<ResponseDto<T>>(url, body, { headers: requestParams.headers });
  }

  put<T>(requestParams: Partial<RequestParams>, body: Partial<T>): Observable<ResponseDto<T>> {
    let url: string = "";
    if (requestParams.fullEndPoint) {
      url = requestParams.fullEndPoint;
    } else {
      url = `${this.url(requestParams)}${requestParams.queryString ? `?${requestParams.queryString}` : ''}`;
    }
    return this.httpClient.put<ResponseDto<T>>(url, body, { headers: requestParams.headers });
  }

  delete<T>(requestParams: Partial<RequestParams>, id: string): Observable<ResponseDto<T>> {
    let url: string = "";
    if (requestParams.fullEndPoint)
      url = requestParams.fullEndPoint;
    else
      url = `${this.url(requestParams)}/${id}${requestParams.queryString ? `?${requestParams.queryString}` : ""}`;

    return this.httpClient.delete<ResponseDto<T>>(url, { headers: requestParams.headers });
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
