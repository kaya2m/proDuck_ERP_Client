import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../../../theme/shared/components/card/card.component";
import { Table, TableModule } from 'primeng/table';
import { TagModule        } from 'primeng/tag';
import { IconFieldModule   } from 'primeng/iconfield';
import { InputIconModule   } from 'primeng/inputicon';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule  } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule    } from 'primeng/dropdown';
import { CommonModule       } from '@angular/common';
import { Customer } from '../../../services/entites/Customer';
import { CustomerService } from '../../../services/common/models/customer.service';
import { List_Customer } from '../../../services/contracts/customer/List_Customer';
import { BaseComponent, SpinnerType } from '../../../services/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../../services/notify/alertify.service';
import { DialogService } from '../../../services/common/dialog.service';
import { PaginatorModule } from 'primeng/paginator';
@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CardComponent,TableModule,TagModule,IconFieldModule,InputIconModule,HttpClientModule,PaginatorModule,InputTextModule,MultiSelectModule,DropdownModule,CommonModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent extends BaseComponent implements OnInit {
  customers!: Customer[];
  paginator: { pageIndex: number, pageSize: number } = { pageIndex: 0, pageSize: 5 };


  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  constructor(
    private customerService: CustomerService,
    spinner : NgxSpinnerService,
    private alertifyService: AlertifyService,
    private dialog: DialogService
  ) {
    super(spinner);
  }

  async ngOnInit() {
    await this.getCustomerList();
  }
  async getCustomerList(){
    this.showSpinner(SpinnerType.squareJellyBox);

    const allCustomers: {totalCount:number,customer:List_Customer[]} = await this.customerService.read(this.paginator? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5,
      () => this.hideSpinner(SpinnerType.squareJellyBox),
      errorMessage => this.alertifyService.message(errorMessage, {
        dismissOther: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      })
    );



   }
   async pageChanged(){
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
}
