import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr:ToastrService) { }
  message(message:string,title:string, toastrOptions:Partial<ToastrOptions>){
    if (toastrOptions.messageType) {
      this.toastr[toastrOptions.messageType](message,title,{
        positionClass: toastrOptions.position,
      });
    } else {
      console.error('Message type is undefined');
    }
  }
}
export class ToastrOptions{
  messageType:ToastrMessageType | undefined;
  position:ToastrPosition | undefined;
}

export enum ToastrMessageType{
  Success="success",
  Info="info",
  Warning ="warning",
  Error="error"
}
export enum ToastrPosition{
  TopRight="toast-top-right",
  TopLeft="toast-top-left",
  BottomRight="toast-bottom-right",
  BottomLeft="toast-bottom-left",
  TopFullWidth="toast-top-full-width",
  BottomFullWidth="toast-bottom-full-width",
  TopCenter="toast-top-center",
  BottomCenter="toast-bottom-center"
}
