import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Create_Customer } from '../../../../services/contracts/customer/Create_Customer';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-customer',
  standalone: true,
  imports: [FormsModule, InputTextModule, InputTextareaModule, DropdownModule, ButtonModule, FieldsetModule, DynamicDialogModule, CommonModule],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.css',
})
export class CreateCustomerComponent{
  constructor(public ref: DynamicDialogRef) {}

  isFormValid(): boolean {
    return (
      !!this.customer.code &&
      !!this.customer.name &&
      !!this.customer.countryCode &&
      !!this.customer.townId &&
      !!this.customer.contactNumber &&
      !!this.customer.email &&
      !!this.customer.address &&
      !!this.customer.postCode &&
      !!this.customer.taxNumber
    );
  }
  customer: Create_Customer = new Create_Customer();
  countries = [{ name: 'Country1', code: 'C1' }, { name: 'Country2', code: 'C2' }];
  cities = [{ name: 'City1' }, { name: 'City2' }];
  towns = [{ name: 'Town1' }, { name: 'Town2' }];

  saveCustomer(): void {
    if (this.isFormValid()) {
      console.log('Customer data:', this.customer);
      this.closeDialog();
    } else {
      console.error('Form is invalid!');
    }
  }

  closeDialog(): void {
    this.ref.close();
  }
}
