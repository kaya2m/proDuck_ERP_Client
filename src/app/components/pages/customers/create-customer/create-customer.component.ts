import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../../../services/common/models/customer.service';
import { ListComponent } from '../list-customer/list.component';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/notify/custom-toastr-service.service';
import { InputMaskModule } from 'primeng/inputmask';
import { AddressService } from '../../../../services/common/models/address.service';

@Component({
  selector: 'app-create-customer',
  standalone: true,
  imports: [FormsModule, InputTextModule, InputTextareaModule, DropdownModule, ButtonModule, FieldsetModule, DynamicDialogModule, CommonModule, ReactiveFormsModule, InputMaskModule],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.css',
})
export class CreateCustomerComponent implements OnInit {
  @ViewChild(ListComponent) listComponent!: ListComponent;

  customer: FormGroup;
  countries: any[] = [];
  cities: any[] = [];
  districts: any[] = [];
  neighborhoods: any[] = [];
  currencyTypes: any[];
  paymentMethods: any[];

  constructor(
    public ref: DynamicDialogRef,
    private customerService: CustomerService,
    private toastrService: CustomToastrService,
    private fb: FormBuilder,
    private addressService: AddressService
  ) { }

  ngOnInit(): void {
    this.customer = this.fb.group({
      companyName: ['', Validators.required],
      contactNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      countryId: ['', Validators.required],
      cityId: [{ value: '', disabled: true }, Validators.required],
      districtId: [{ value: '', disabled: true }, Validators.required],
      neighborhoodId: [{ value: '', disabled: true }],
      address: ['', Validators.required],
      postCode: ['', Validators.required],
      taxNumber: ['', Validators.required],
      name: ['', Validators.required],
      contactNumber2: [''],
      email2: ['', Validators.email],
      address2: [''],
      taxOffice: [''],
      idNumber: [''],
      notes: [''],
      currencyType: [''],
      paymentMethod: [''],
    });

    this.addressService.getCountry().subscribe((response) => {
      this.countries = response.data;
    });

    this.customer.get('countryId')?.valueChanges.subscribe((countryId: string) => {
      this.onCountryChange(countryId);
    });

    this.customer.get('cityId')?.valueChanges.subscribe((cityId: string) => {
      this.onCityChange(cityId);
    });

    this.customer.get('districtId')?.valueChanges.subscribe((districtId: string) => {
      this.onDistrictChange(districtId);
    });
    this.currencyTypes = [
      { currencyId: 'USD' },
      { currencyId: 'EUR' },
      { currencyId: 'TRY' },
      { currencyId: 'GBP' }
    ];

    this.paymentMethods = [
      { methodName: 'Credit Card' },
      { methodName: 'Bank Transfer' },
      { methodName: 'Cash' },
      { methodName: 'Check' },
      { methodName: 'Promissory Note' }
    ];
  }

  onCountryChange(countryId: string) {
    this.customer.get('cityId')?.reset({ value: '', disabled: true });
    this.customer.get('districtId')?.reset({ value: '', disabled: true });
    this.customer.get('neighborhoodId')?.reset({ value: '', disabled: true });
    this.cities = [];
    this.districts = [];
    this.neighborhoods = [];

    if (countryId) {
      this.addressService.getCity(countryId).subscribe((response) => {
        this.cities = response.data;
        this.customer.get('cityId')?.enable();
      });
    }
  }

  onCityChange(cityId: string) {
    this.customer.get('districtId')?.reset({ value: '', disabled: true });
    this.customer.get('neighborhoodId')?.reset({ value: '', disabled: true });
    this.districts = [];
    this.neighborhoods = [];

    if (cityId) {
      this.addressService.getDistrict(cityId).subscribe((response) => {
        this.districts = response.data;
        this.customer.get('districtId')?.enable();
      });
    }
  }

  onDistrictChange(districtId: string) {
    this.customer.get('neighborhoodId')?.reset({ value: '', disabled: true });
    this.neighborhoods = [];

    if (districtId) {
      this.addressService.getNeighborhood(districtId).subscribe((response) => {
        this.neighborhoods = response.data;
        this.customer.get('neighborhoodId')?.enable();
      });
    }
  }

  async saveCustomer(customer: any) {
    if (this.customer.valid) {
      this.customerService.create(
        customer,
        async (result) => {
          this.toastrService.message('Customer Saved', result.message, {
            messageType: ToastrMessageType.Success,
            position: ToastrPosition.TopRight,
          });
          this.closeDialog();
          await this.listComponent.getCustomerList();
        },
        (error) => {
          this.toastrService.message('Error', 'Error saving customer', {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopCenter,
          });
        }
      );
    } else {
      this.toastrService.message('Validation Error', 'Please fill in the required fields', {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopCenter,
      });
    }
  }

  closeDialog(): void {
    this.ref.close();
  }
}
