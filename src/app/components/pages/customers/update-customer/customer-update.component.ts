import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ListComponent } from '../list-customer/list.component';
import { CustomerService } from '../../../../services/common/models/customer.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/notify/custom-toastr-service.service';
import { Create_Customer } from '../../../../services/contracts/customer/Create_Customer';

@Component({
  selector: 'app-customer-update',
  standalone: true,
  imports: [FormsModule, InputTextModule, InputTextareaModule, DropdownModule, ButtonModule, FieldsetModule, DynamicDialogModule, CommonModule, ReactiveFormsModule, InputMaskModule],

  templateUrl: './customer-update.component.html',
  styleUrl: './customer-update.component.css'
})
export class CustomerUpdateComponent {

  constructor(
    public ref: DynamicDialogRef,
    private customerService: CustomerService,
    private toastrService: CustomToastrService,
    private fb: FormBuilder,
    public config: DynamicDialogConfig) {
  }
  @ViewChild(ListComponent) listComponent!: ListComponent;
  customer: FormGroup
  countries: any[] = [];
  cities: any[] = [];
  districts: any[] = [];
  neighborhoods: any[] = [];

  ngOnInit(): void {
    const customer = this.config.data.customer;
    this.customer = this.fb.group(
      {
        companyName: [customer.companyName, Validators.required],
        contactNumber: [customer.contactNumber, Validators.required],
        email: [customer.email, [Validators.required, Validators.email]],
        countryId: [customer.countryId, Validators.required],
        cityId: [customer.cityId, Validators.required],
        districtId: [customer.districtId, Validators.required],
        neighborhoodId: [customer.neighborhoodId],
        address: [customer.address, Validators.required],
        postCode: [customer.postCode, Validators.required],
        taxNumber: [customer.taxNumber, Validators.required],
        name: [customer.name, Validators.required],
        contactNumber2: [customer.contactNumber2],
        email2: [customer.email2, [Validators.email]],
        address2: [customer.address2],
        taxOffice: [customer.taxOffice],
        idNumber: [customer.idNumber],
        notes: [customer.notes],
        id: [customer.id]
      }
    );
  }

 
  updateCustomer(customer: Create_Customer) {
    if (this.customer.valid) {
      this.customerService.update(customer,
        (result) => {
          result;
          this.toastrService.message("Müşteri Kaydı", "Müşteri başarılı bir şekilde güncellendi", {
            messageType: ToastrMessageType.Success,
            position: ToastrPosition.TopRight
          })
          this.closeDialog()
          this.listComponent.getCustomerList();
        },
        (error) => { alert(error) });
    }
    else {
      this.toastrService.message("", "Müşteri güncelleme başarısız lütfen zorunlu alanları doldunuz", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopCenter
      })
    }
  }

  closeDialog(): void {
    this.ref.close();
  }
}
