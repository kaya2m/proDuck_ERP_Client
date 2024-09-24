import { Injectable } from '@angular/core';
declare let alertify: any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  message(message: string, options: Partial<AlertifyOptions>) {
    if (options.delay) {
      alertify.set('notifier', 'delay', options.delay);
    }
    if (options.position) {
      alertify.set('notifier', 'position', options.position);
    }
    if (options.messageType) {
      const msg = alertify[options.messageType](message);
      if (options.dismissOther) {
        msg.dismissOthers();
      }
    } else {
      alertify.message(message);
    }
  }

  dismiss(){
    alertify.dismiss();
  }
}
export class AlertifyOptions{
  messageType: MessageType = MessageType.Message;
  position : Position = Position.BottomRight;
  delay : number = 3;
  dismissOther:boolean = true;
}
export enum MessageType {
  Success = "success",
  Error= "error",
  Warning ="warning",
  Message ="message",
  Notify="notify"
}
export enum Position {
  TopLeft="top-left",
  TopRight="top-right",
  BottomLeft="bottom-left",
  BottomRight="bottom-right",
  TopCenter="top-center",
  BottomCenter="bottom-center",
}
