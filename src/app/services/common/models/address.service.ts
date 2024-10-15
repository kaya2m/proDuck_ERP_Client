import { Injectable } from '@angular/core';
import { HttpClientService, RequestParams } from '../http-client.service';
import { Observable } from 'rxjs';
import { ResponseDto } from '../../contracts/ResponseDto';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpClient: HttpClientService) { }

  getCountry(): Observable<ResponseDto<any>> {
    const requestParams: Partial<RequestParams> = {
      controller: 'addressInfo',
      action: 'countries'
    };
    return this.httpClient.get<any>(requestParams);
  }

  getCity(countryId: string): Observable<ResponseDto<any>> {
    const requestParams: Partial<RequestParams> = {
      controller: 'addressInfo',
      action: `countries/${countryId}/cities`
    };
    return this.httpClient.get<any>(requestParams);
  }

  getDistrict(cityId: string): Observable<ResponseDto<any>> {
    const requestParams: Partial<RequestParams> = {
      controller: 'addressInfo',
      action: `cities/${cityId}/districts`
    };
    return this.httpClient.get<any>(requestParams);
  }

  getNeighborhood(districtId: string): Observable<ResponseDto<any>> {
    const requestParams: Partial<RequestParams> = {
      controller: 'addressInfo',
      action: `districts/${districtId}/neighborhoods`
    };
    return this.httpClient.get<any>(requestParams);
  }
}
