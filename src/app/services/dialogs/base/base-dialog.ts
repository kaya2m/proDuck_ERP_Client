import { MatDialogRef } from "@angular/material/dialog";

export class BaseDialog<TComponent> {
  constructor(public dialogRef: MatDialogRef<TComponent>) {}
    close() {
        this.dialogRef.close();
    }
}
export enum FileUploadDialogState{
    Yes,
    No
  }