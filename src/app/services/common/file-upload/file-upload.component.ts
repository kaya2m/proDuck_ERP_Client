import { Component, Input } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { HttpClientService } from '../http-client.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../notify/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../notify/custom-toastr-service.service';
import { FileUploadDialogComponent, FileUploadDialogState } from '../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { SpinnerType } from '../../base/base.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  constructor(
    private httpClient: HttpClientService,
    private alertify: AlertifyService,
    private toastr: CustomToastrService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private spinner: NgxSpinnerService
  ) { }

  public files!: NgxFileDropEntry[];

  @Input() options!: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }

    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: FileUploadDialogState.Yes,
      afterClosed: () => {
        this.spinner.show(SpinnerType.ballAtom);
        this.httpClient.post({
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({ 'responseType': 'blob' })
        }, fileData).subscribe(
          (data) => {
            const message: string = 'Dosyalar başarıyla yüklenmiştir.';
            this.spinner.hide(SpinnerType.ballAtom);

            if (this.options.isAdminPage) {
              this.alertify.message(message, {
                dismissOther: true,
                messageType: MessageType.Success,
                position: Position.TopRight
              });
            } else {
              this.toastr.message(message, 'Başarılı', {
                messageType: ToastrMessageType.Success,
                position: ToastrPosition.TopRight,
              });
            }
          },
          (error: HttpErrorResponse) => {
            const message: string = 'Dosya yüklenirken bir hata oluştu';
            this.spinner.hide(SpinnerType.ballAtom);

            if (this.options.isAdminPage) {
              this.alertify.message(message, {
                dismissOther: true,
                messageType: MessageType.Error,
                position: Position.TopRight
              });
            } else {
              this.toastr.message(message, 'Başarısız', {
                messageType: ToastrMessageType.Error,
                position: ToastrPosition.TopRight,
              });
            }
          }
        );
      }
    });
  }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}
