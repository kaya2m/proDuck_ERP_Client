import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { List_Customer } from '../../contracts/customer/List_Customer';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_Customer } from '../../contracts/customer/Create_Customer';
import { ResponseDto } from '../../contracts/ResponseDto';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClientService, private htpClient :HttpClient) { }
  create(customer: Create_Customer, successCallBack: () => void, errorCallBack: (errorMessage: string) => void) {
    this.httpClient.post({
      controller: 'customers'
    }, customer)
      .subscribe(
        (result) => {
          successCallBack();
        },
        (errorResponse: HttpErrorResponse) => {
          const _error: { key: string, value: string[] }[] = errorResponse.error;
          let message = '';

          _error.forEach((v) => {
            v.value.forEach((_v) => {
              message += _v + '\n';
            });
          });

          errorCallBack(message);
        }
      );
  }

  async read(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    debugger
    const promiseData = this.httpClient.get<List_Customer[]>({
      controller: 'customers',
      queryString: `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d=>successCallBack())
    .catch((eroor:HttpErrorResponse)=>errorCallBack(eroor.message));

    return await promiseData;
  }

 async delete (id:string){
  const deleteObservable: Observable<any>=  this.httpClient.delete<any>({
      controller: 'customers'
    },id);
    await firstValueFrom(deleteObservable);
  }
}
