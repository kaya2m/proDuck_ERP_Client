import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from '../../contracts/Create_Product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Customer } from '../../contracts/customer/List_Customer';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_Customer } from '../../contracts/customer/Create_Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClientService) { }
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

  async read(page:number=0, size:number=5,successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{totalCount:number,customer:List_Customer[]}>
  {
      const promiseData:Promise<{totalCount:number,customer:List_Customer[]}>
      =  this.httpClient.get<{totalCount:number,customer:List_Customer[]} | undefined>({
        controller: 'customers',
        queryString: `page=${page}&size=${size}`
      }).toPromise().then(data => data ?? { totalCount: 0, customer: [] });

      promiseData.then(d => {
        if (successCallBack) {
          successCallBack();
        }
      })
      .catch((eroor:HttpErrorResponse) => {
        if (errorCallBack) {
          errorCallBack(eroor.message);
        }
      });

      return await promiseData;
  }

 async delete (id:string){
  const deleteObservable: Observable<any>=  this.httpClient.delete<any>({
      controller: 'customers'
    },id);
    await firstValueFrom(deleteObservable);
    debugger;
  }
}
