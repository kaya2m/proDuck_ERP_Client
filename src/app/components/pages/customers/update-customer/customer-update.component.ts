import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
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
  imports: [FormsModule, InputTextModule, InputTextareaModule, DropdownModule, ButtonModule, FieldsetModule, DynamicDialogModule, CommonModule,ReactiveFormsModule,InputMaskModule],

  templateUrl: './customer-update.component.html',
  styleUrl: './customer-update.component.css'
})
export class CustomerUpdateComponent {

  constructor(public ref: DynamicDialogRef,private customerService : CustomerService,private toastrService: CustomToastrService,private fb: FormBuilder) {
  }
  @ViewChild(ListComponent) listComponent!: ListComponent;
  customer:FormGroup

  ngOnInit(): void {
    this.customer = this.fb.group({

      companyName: ['', Validators.required],

      contactNumber: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],

      townId: ['', Validators.required],
      cityId: ['', Validators.required],

      address: ['', Validators.required],

      postCode: ['', Validators.required],

      taxNumber: ['', Validators.required],

      name: ['', Validators.required],

      contactNumber2: [''],

      email2: ['', [Validators.email]],

      countryId: ['', Validators.required],

      address2: [''],

      taxOffice: [''],

      idNumber: [''],

      notes: ['']

    });
  }

  countries = [{id:"b77d409a-10cd-4a47-8e94-b0cd0ab50aa1" , name: 'Country1', code: 'C1' }, {id:"3fa85f64-5717-4562-b3fc-2c963f66afa6" ,  name: 'Country2', code: 'C2' }];
  cities = [{id:"b77d409a-10cd-4a47-8e94-b0cd0ab50aa1" , name: 'City1' }, {id:"b77d409a-10cd-4a47-8e94-b0cd0ab50aa1", name: 'City2' }];
  towns = [{ id:"b77d409a-10cd-4a47-8e94-b0cd0ab50aa1" ,name: 'Town1' }, {id:"b77d409a-10cd-4a47-8e94-b0cd0ab50aa1", name: 'Town2' }];

  updateCustomer(customer: Create_Customer) {
    debugger;
    if (this.customer.valid) {
   this.customerService.create(customer,
    (result)=>{
      result;
      this.toastrService.message("Müşteri Kaydı","Müşteri başarılı bir şekilde kaydoldu", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
      this.closeDialog()
      this.listComponent.getCustomerList();
    },
    (error)=>{alert(error)});
    }
    else {
      this.toastrService.message("","Müşteri kaydı başarısız lütfen zorunlu alanları doldunuz", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopCenter
      })
    }
  }

  closeDialog(): void {
    this.ref.close();
  }
}
