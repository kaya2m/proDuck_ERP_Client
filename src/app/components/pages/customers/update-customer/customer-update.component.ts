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
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../../../services/notify/alertify.service';
import { BaseComponent, SpinnerType } from '../../../../services/base/base.component';
import { GetById_Customer } from '../../../../services/contracts/customer/GetById_Customer';
import { AddressService } from '../../../../services/common/models/address.service';

@Component({
  selector: 'app-customer-update',
  standalone: true,
  imports: [FormsModule, InputTextModule, InputTextareaModule, DropdownModule, ButtonModule, FieldsetModule, DynamicDialogModule, CommonModule, ReactiveFormsModule, InputMaskModule],
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent extends BaseComponent {

  @ViewChild(ListComponent) listComponent: ListComponent;
  customer: FormGroup;
  customerData: GetById_Customer;
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
    spinner: NgxSpinnerService,
    private alertifyService: AlertifyService,
    public config: DynamicDialogConfig,
    private addressService: AddressService
  ) {
    super(spinner);
  }

  ngOnInit(): void {
    this.customer = this.fb.group({
      id: [this.config.data.customer.id],
      companyName: ['', Validators.required],
      contactNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      countryCode: [''],
      countryId: ['', Validators.required],
      cityId: [{ value: '', disabled: true }, Validators.required],
      districtId: [{ value: '', disabled: true }, Validators.required],
      neighborhoodId: [{ value: '', disabled: true }],
      address: ['', Validators.required],
      postCode: ['', Validators.required],
      taxNumber: ['', Validators.required],
      name: ['',],
      contactNumber2: [''],
      email2: ['', Validators.email],
      address2: [''],
      taxOffice: [''],
      idNumber: [''],
      notes: [''],
      paymentMethod: ['',],
      currencyTypes: ['',]
    });

    this.loadCustomerData();

    this.addressService.getCountry().subscribe((response) => {
      this.countries = response.data;
    });

    this.setupFormValueChanges();

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

  async loadCustomerData(): Promise<void> {
    try {
      this.customerData = await this.customerService.readById(this.config.data.customer.id);
      this.customer.patchValue(this.customerData);
    } catch (error) {
      console.error('Error fetching customer data', error);
    }
  }

  setupFormValueChanges(): void {
    this.customer.get('countryId')?.valueChanges.subscribe((countryId: string) => {
      const selectedCountry = this.countries.find(country => country.countryId === countryId);
      if (selectedCountry) {
        this.customer.get('countryCode')?.setValue(selectedCountry.countryCode);
      }
      this.onCountryChange(countryId);

    });

    this.customer.get('cityId')?.valueChanges.subscribe((cityId: string) => {
      this.onCityChange(cityId);
    });

    this.customer.get('districtId')?.valueChanges.subscribe((districtId: string) => {
      this.onDistrictChange(districtId);
    });
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

        if (this.customerData && this.customerData.cityId) {
          this.customer.patchValue({ cityId: this.customerData.cityId });
          this.onCityChange(this.customerData.cityId);
        }
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

        if (this.customerData && this.customerData.districtId) {
          this.customer.patchValue({ districtId: this.customerData.districtId });
          this.onDistrictChange(this.customerData.districtId);
        }
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

        if (this.customerData && this.customerData.neighborhoodId) {
          this.customer.patchValue({ neighborhoodId: this.customerData.neighborhoodId });
        }
      });
    }
  }

  updateCustomer(customer: Create_Customer) {
    if (this.customer.valid) {
      this.customerService.update(customer,
        (result) => {
          this.toastrService.message("Müşteri Kaydı", "Müşteri başarılı bir şekilde güncellendi", {
            messageType: ToastrMessageType.Success,
            position: ToastrPosition.TopRight
          });
          this.closeDialog(true);
        },
        (error) => {
          this.toastrService.message("Hata", "Müşteri güncelleme başarısız", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopCenter
          });
        });
    } else {
      this.toastrService.message("Hata", "Lütfen zorunlu alanları doldurun", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopCenter
      });
    }
  }

  closeDialog(updated: boolean): void {
    this.ref.close(updated);
  }
}
