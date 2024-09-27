import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Create_Customer } from '../../../../services/contracts/customer/Create_Customer';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-customer',
  standalone: true,
  imports: [FormsModule, InputTextModule, InputTextareaModule, DropdownModule, ButtonModule, FieldsetModule, DynamicDialogModule, CommonModule],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.css',
})
export class CreateCustomerComponent {
  customer: Create_Customer = new Create_Customer();
  countries = [{ name: 'Country1', code: 'C1' }, { name: 'Country2', code: 'C2' }];
  cities = [{ name: 'City1' }, { name: 'City2' }];
  towns = [{ name: 'Town1' }, { name: 'Town2' }];

  saveCustomer(): void {
    console.log('Customer data:', this.customer);
  }

  closeDialog(): void {}
}
