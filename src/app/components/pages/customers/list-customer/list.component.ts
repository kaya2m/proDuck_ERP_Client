import { style } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
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
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateCustomerComponent } from '../create-customer/create-customer.component';
import { MenuItem } from 'primeng/api';
import { ContextMenu, ContextMenuModule } from 'primeng/contextmenu';
@Component({
  selector: 'customer-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  standalone: true,
  imports: [CardComponent, TableModule, TagModule, IconFieldModule, ContextMenuModule, InputIconModule, PaginatorModule, InputTextModule, MultiSelectModule, DropdownModule, CommonModule, ButtonModule],
  providers: [DialogService],
})

export class ListComponent extends BaseComponent implements OnInit {
  totalCount: number;
  customerId: string;
  columns: { field: string; header: string; filterType: string; }[];
  searchValue: any;
  constructor(
    private customerService: CustomerService,
    spinner: NgxSpinnerService,
    private alertifyService: AlertifyService,
    private dialog: DialogService
  ) {
    super(spinner);
  }

  ref: DynamicDialogRef | undefined;
  customers!: List_Customer[]
  paginator: { pageIndex: number, pageSize: number } = { pageIndex: 0, pageSize: 5 };


  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  contextMenuItems: MenuItem[] = [];
  @ViewChild('cm') cm!: ContextMenu;
  async ngOnInit() {
    await this.getCustomerList();
    this.columns = [
      { field: 'code', header: 'Code', filterType: 'text' },
      { field: 'name', header: 'Name', filterType: 'text' },
      { field: 'paymentMethod', header: 'Payment Method', filterType: 'text' },
      { field: 'countryCode', header: 'Country Code', filterType: 'text' },
      { field: 'country', header: 'Country', filterType: 'text' },
      { field: 'city', header: 'City', filterType: 'text' },
      { field: 'town', header: 'Town', filterType: 'text' },
      { field: 'contactNumber', header: 'Contact Number', filterType: 'text' },
      { field: 'contactNumber2', header: 'Contact Number 2', filterType: 'text' },
      { field: 'email', header: 'Email', filterType: 'text' },
      { field: 'email2', header: 'Email 2', filterType: 'text' },
      { field: 'address', header: 'Address', filterType: 'text' },
      { field: 'address2', header: 'Address 2', filterType: 'text' },
      { field: 'postCode', header: 'Post Code', filterType: 'text' },
      { field: 'companyName', header: 'Company Name', filterType: 'text' },
      { field: 'taxNumber', header: 'Tax Number', filterType: 'text' },
      { field: 'taxOffice', header: 'Tax Office', filterType: 'text' },
      { field: 'idNumber', header: 'ID Number', filterType: 'text' },
      { field: 'notes', header: 'Notes', filterType: 'text' }
    ];

    this.contextMenuItems = [
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.deleteCustomer(this.customerId)
      }
    ];

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
      this.totalCount = allCustomers.totalCount;
    }
    this.loading = false;
  }
  async loadCustomers(event: any) {
    this.loading = true;
    const pageNumber = event.first / event.rows;
    const pageSize = event.rows;

    this.loading = true;
    const allCustomers = await this.customerService.read(pageNumber, pageSize,
      () => this.hideSpinner(SpinnerType.squareJellyBox),
      errorMessage => this.alertifyService.message(errorMessage, {
        dismissOther: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      })
    );
    if (allCustomers) {
      this.customers = allCustomers.data;
      this.totalCount = allCustomers.totalCount;
    }
    this.loading = false;
  }


  async pageChanged() {
    await this.getCustomerList();
  }
  clear(table: Table) {
    table.clear();
  }


  openCreateCustomerPopup() {
    this.ref = this.dialog.open(CreateCustomerComponent, {
      header: 'Create New Customer',
      width: '70%',
      modal: true,
      contentStyle: { 'max-height': '500px', 'overflow': 'auto' },
      baseZIndex: 10000,
      closeOnEscape: false,
      dismissableMask: false,
      style: { 'border-radius': '25px' },
      footer: 'footer',
    });
  }
  onGlobalFilter(table: Table, event: Event) {
    var text = (event.target as HTMLInputElement).value
    table.filterGlobal(text, 'contains');
  }

  onRightClick(event: MouseEvent, customer: List_Customer) {
    event.preventDefault();
    this.customerId = customer.id;
    this.cm.show(event);
  }

  async deleteCustomer(id: string) {
    await this.customerService.delete(id).then(
      () => this.hideSpinner(SpinnerType.squareJellyBox),
      errorMessage => this.alertifyService.message(errorMessage, {
        dismissOther: true,
      })
    );

  }
}
