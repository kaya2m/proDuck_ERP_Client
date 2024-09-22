import { ComponentType } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(DialogParameter: Partial<DialogParameters>): void {
    const dialogRef = this.dialog.open(DialogParameter.componentType, {
      width: DialogParameter.options?.width,
      height: DialogParameter.options?.height,
      position: DialogParameter.options?.position,
      data: DialogParameter.data,
    });

    dialogRef.afterClosed().subscribe(result => {
      // Eğer kullanıcı belirli bir veriyi döndüyse ve bu veri, iletilen veriyle aynıysa,
      // sonra afterClosed fonksiyonunu çağır.
      if (result === DialogParameter.data) {
        DialogParameter.afterClosed();
      }
    });
  }
}

export class DialogParameters {
  componentType: ComponentType<any>;
  data: any;
  afterClosed: () => void;
  options?: Partial<DialogOptions> = new DialogOptions();
}

export class DialogOptions {
  width?: string;
  height?: string;
  position?: DialogPosition;
}
