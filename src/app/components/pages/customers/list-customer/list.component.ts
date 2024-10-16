import { style } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../../services/base/base.component';
import { CustomerService } from '../../../../services/common/models/customer.service';
import { AlertifyService, MessageType, Position } from '../../../../services/notify/alertify.service';
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
import { CustomerUpdateComponent } from '../update-customer/customer-update.component';
import { Create_Customer } from '../../../../services/contracts/customer/Create_Customer';

@Component({
  selector: 'customer-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  standalone: true,
  imports: [CardComponent, TableModule, TagModule, IconFieldModule, ContextMenuModule, InputIconModule, PaginatorModule, InputTextModule, MultiSelectModule, DropdownModule, CommonModule, ButtonModule],
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

  @ViewChild('table') table!: Table;
  ref: DynamicDialogRef | undefined;
  customers!: List_Customer[]
  paginator: { pageIndex: number, pageSize: number } = { pageIndex: 0, pageSize: 5 };
  totalCount: number;
  customerId: string;
  customer: List_Customer;
  columns: { field: string; header: string; filterType: string; }[];
  searchValue: any;
  statuses!: any[];
  loading: boolean = true;
  activityValues: number[] = [0, 100];
  contextMenuItems: MenuItem[] = [];
  @ViewChild('cm') cm!: ContextMenu;

  async ngOnInit() {
    await this.getCustomerList();
    this.columns = [
      { field: 'code', header: 'Kod', filterType: 'text' },
      { field: 'name', header: 'Kısa Ad', filterType: 'text' },
      { field: 'paymentMethod', header: 'Ödeme Türü', filterType: 'text' },
      { field: 'countryCode', header: 'Ülke Kodu', filterType: 'text' },
      { field: 'countryName', header: 'Ülke', filterType: 'text' },
      { field: 'cityName', header: 'İl', filterType: 'text' },
      { field: 'districtName', header: 'İlçe', filterType: 'text' },
      { field: 'neighborhoodName', header: 'Mahalle', filterType: 'text' },
      { field: 'contactNumber', header: 'İletişim No', filterType: 'text' },
      { field: 'contactNumber2', header: 'İletişim No 2', filterType: 'text' },
      { field: 'email', header: 'Email', filterType: 'text' },
      { field: 'email2', header: 'Email 2', filterType: 'text' },
      { field: 'address', header: 'Adres', filterType: 'text' },
      { field: 'address2', header: 'Adres 2', filterType: 'text' },
      { field: 'postCode', header: 'Posta Kodu', filterType: 'text' },
      { field: 'companyName', header: 'Firma Adı', filterType: 'text' },
      { field: 'taxNumber', header: 'Vergi Numarası', filterType: 'text' },
      { field: 'taxOffice', header: 'Vergi Dairesi', filterType: 'text' },
      { field: 'idNumber', header: 'Kimlik Numarası', filterType: 'text' },
      { field: 'notes', header: 'Not', filterType: 'text' }
    ];

    this.contextMenuItems = [
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.deleteCustomer(this.customerId)
      }, {
        label: 'Update',
        icon: 'pi pi-pencil',
        command: () => this.updateCustomer(this.customer)
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
      width: '60%',
      modal: true,
      contentStyle: { 'max-height': '500px', 'overflow': 'auto' },
      baseZIndex: 10000,
      closeOnEscape: false,
      dismissableMask: false,
      style: { 'border-radius': '25px' },
      footer: 'footer',
    });
  }
  updateCustomer(customer: List_Customer) {
    this.ref = this.dialog.open(CustomerUpdateComponent, {
      header: 'Update Customer',
      width: '60%',
      modal: true,
      contentStyle: { 'max-height': '500px', 'overflow': 'auto' },
      baseZIndex: 10000,
      closeOnEscape: false,
      dismissableMask: false,
      style: { 'border-radius': '25px' },
      footer: 'footer',
      data: { customer }
    });
  }
  onRightClick(event: MouseEvent, customer: List_Customer) {
    event.preventDefault();
    this.customerId = customer.id;
    this.customer = customer;
    this.cm.show(event);
  }

  async deleteCustomer(id: string) {
    var result = await this.customerService.delete(id);
    if (result.isSuccessfull) {
      this.alertifyService.message("Customer Deleted", {
        messageType: MessageType.Success,
        position: Position.TopRight
      });
      this.getCustomerList();
    }
    else {
      this.alertifyService.message("Customer could not be deleted", {
        messageType: MessageType.Error,
        position: Position.TopRight
      });
    }

  }
}
