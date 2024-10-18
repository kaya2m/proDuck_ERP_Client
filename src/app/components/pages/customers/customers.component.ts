import { Component, OnInit, ViewChild } from "@angular/core";
import { BaseComponent, SpinnerType } from "../../../services/base/base.component";
import { ListComponent } from "./list-customer/list.component";
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClientService } from "../../../services/common/http-client.service";
import { CommonModule } from "@angular/common";
import { DynamicDialogModule } from "primeng/dynamicdialog";
import { CreateCustomerComponent } from "./create-customer/create-customer.component";
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
  standalone: true,
  imports: [CommonModule, ListComponent, DynamicDialogModule, CreateCustomerComponent],
})
export class CustomersComponent extends BaseComponent  implements OnInit {
  constructor(spinner : NgxSpinnerService, private httpClient : HttpClientService) {
    super(spinner);
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.ballAtom);
}
    @ViewChild(ListComponent) listComponent : ListComponent;
}
 