import { TestBed } from '@angular/core/testing';

import { CustomToastrService } from './custom-toastr-service.service';

describe('CustomToastrServiceService', () => {
  let service: CustomToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomToastrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
