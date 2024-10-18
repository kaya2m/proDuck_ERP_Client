import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTasksNotesComponent } from './customer-tasks-notes.component';

describe('CustomerTasksNotesComponent', () => {
  let component: CustomerTasksNotesComponent;
  let fixture: ComponentFixture<CustomerTasksNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerTasksNotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerTasksNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
