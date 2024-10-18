import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInterplayComponent } from './customer-interplay.component';

describe('CustomerInterplayComponent', () => {
  let component: CustomerInterplayComponent;
  let fixture: ComponentFixture<CustomerInterplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerInterplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerInterplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
