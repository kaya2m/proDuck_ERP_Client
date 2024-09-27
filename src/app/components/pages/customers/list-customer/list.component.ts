import { Component, OnInit } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../../services/base/base.component';
import { CustomerService } from '../../../../services/common/models/customer.service';
import { AlertifyService, MessageType, Position } from '../../../../services/notify/alertify.service';
// import { DialogService } from '../../../../services/common/dialog.service';
import { List_Customer } from '../../../../services/contracts/customer/List_Customer';
import { CardComponent } from "../../../../theme/shared/components/card/card.component";
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateCustomerComponent } from '../create-customer/create-customer.component';
@Component({
  selector: 'customer-list',
  templateUrl:'./list.component.html',
  styleUrl: './list.component.css',
  standalone: true,
  imports: [CardComponent,TableModule,TagModule,IconFieldModule,InputIconModule,PaginatorModule,InputTextModule,MultiSelectModule,DropdownModule,CommonModule,ButtonModule],
  providers: [DialogService],
})

export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    private customerService: CustomerService,
    spinner: NgxSpinnerService,
    private alertifyService: AlertifyService,
    private dialog: DialogService
  ) {
    super(spinner);
  }

  customers!: List_Customer[]
  paginator: { pageIndex: number, pageSize: number } = { pageIndex: 0, pageSize: 5 };


  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];



  async ngOnInit() {
     await this.getCustomerList();
  }

  async getCustomerList() {
    this.loading = true;
    const allCustomers = await this.customerService.read(this.paginator.pageIndex, this.paginator.pageSize,
      () => this.hideSpinner(SpinnerType.squareJellyBox),
      errorMessage => this.alertifyService.message(errorMessage, {
        dismissOther: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      })
    );
    if (allCustomers) {
      this.customers = allCustomers.data;
    }
    this.loading = false;
  }

  async pageChanged() {
    await this.getCustomerList();
  }
  clear(table: Table) {
    table.clear();
  }

  getSeverity(status: string) {
    switch (status) {
      case 'unqualified':
        return 'danger';

      case 'qualified':
        return 'success';

      case 'new':
        return 'info';

      case 'negotiation':
        return 'warning';

      case 'renewal':
        return null;

      default:

        return 'secondary'; // Changed from 'unknown' to 'secondary'
    }
  }

  openCreateCustomerPopup() {
    this.dialog.open(CreateCustomerComponent, {
      header: 'Create New Customer',
      width: '70%',
      contentStyle: { 'max-height': '500px', 'overflow': 'auto' }, // Fixed height and overflow for scroll
      baseZIndex: 10000,
      closeOnEscape: false,
      dismissableMask: false,
      style: { 'border-radius': '25px' },
    });
  }

}
