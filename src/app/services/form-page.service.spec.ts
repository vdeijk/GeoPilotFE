import { TestBed } from '@angular/core/testing';
import { FormPageService } from './form-page.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GeographicalDataService } from '../api/generated/api/geographicalData.service';
import { TablePageService } from './table-page.service';

// Mocks
class MockToastr {
  success = jasmine.createSpy('success');
  error = jasmine.createSpy('error');
}
class MockGeoService {
  apiGeographicalDataIdPut = jasmine.createSpy('put').and.returnValue({ toPromise: () => Promise.resolve() });
  apiGeographicalDataPost = jasmine.createSpy('post').and.returnValue({ toPromise: () => Promise.resolve() });
  apiGeographicalDataIdDelete = jasmine.createSpy('delete').and.returnValue({ toPromise: () => Promise.resolve() });
}
class MockTableService {
  fetchTableData = jasmine.createSpy('fetchTableData');
}

describe('FormPageService', () => {
  let service: FormPageService;
  let geoService: MockGeoService;
  let toastr: MockToastr;
  let tableService: MockTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormPageService,
        FormBuilder,
        { provide: ToastrService, useClass: MockToastr },
        { provide: GeographicalDataService, useClass: MockGeoService },
        { provide: TablePageService, useClass: MockTableService },
      ],
    });
    service = TestBed.inject(FormPageService);
    geoService = TestBed.inject(GeographicalDataService) as any;
    toastr = TestBed.inject(ToastrService) as any;
    tableService = TestBed.inject(TablePageService) as any;
  });

  it('should create the service and form', () => {
    expect(service).toBeTruthy();
    expect(service.form).toBeTruthy();
  });

  it('should patch value and set currentId', () => {
    service.patchValue({ id: 5, huisnummer: 10 });
    expect(service.form.value.id).toBe(5);
    expect((service as any).currentId).toBe(5);
  });

  it('should reset form and currentId', () => {
    service.patchValue({ id: 5 });
    service.reset();
    expect(service.form.value.id).toBeNull();
    expect((service as any).currentId).toBeNull();
  });

  // Helper: Patch all required fields for a valid form
  function patchRequiredFields(service: FormPageService, extra: Partial<any> = {}) {
    service.form.patchValue({
      huisnummer: 1,
      openbareruimte: 'TestStraat',
      postcode: '1234AB',
      woonplaats: 'TestStad',
      ...extra
    });
  }

  it('should call POST on submit when currentId is null', async () => {
    patchRequiredFields(service);
    (service as any).currentId = null;
    await service.submit();
    expect(geoService.apiGeographicalDataPost).toHaveBeenCalled();
    expect(toastr.success).toHaveBeenCalledWith('Data submitted successfully!');
    expect(tableService.fetchTableData).toHaveBeenCalled();
  });

  it('should call PUT on submit when currentId is set', async () => {
    patchRequiredFields(service);
    (service as any).currentId = 5;
    await service.submit();
    expect(geoService.apiGeographicalDataIdPut).toHaveBeenCalledWith(5, jasmine.any(Object));
    expect(toastr.success).toHaveBeenCalledWith('Data updated successfully!');
    expect(tableService.fetchTableData).toHaveBeenCalled();
  });

  it('should show error and not submit if huisnummer is invalid', async () => {
    patchRequiredFields(service, { huisnummer: 'abc' as any });
    await service.submit();
    expect(toastr.error).toHaveBeenCalledWith('Huisnummer is required and must be a number.');
    expect(geoService.apiGeographicalDataPost).not.toHaveBeenCalled();
    expect(geoService.apiGeographicalDataIdPut).not.toHaveBeenCalled();
  });

  it('should handle API errors on submit', async () => {
    geoService.apiGeographicalDataPost.and.returnValue({ toPromise: () => Promise.reject('fail') });
    patchRequiredFields(service);
    (service as any).currentId = null;
    await service.submit();
    expect(toastr.error).toHaveBeenCalledWith('Error submitting data.');
  });

  it('should call delete and handle success', async () => {
    await service.delete(1);
    expect(geoService.apiGeographicalDataIdDelete).toHaveBeenCalledWith(1);
    expect(toastr.success).toHaveBeenCalledWith('Data deleted successfully!');
    expect(tableService.fetchTableData).toHaveBeenCalled();
  });

  it('should handle API errors on delete', async () => {
    geoService.apiGeographicalDataIdDelete.and.returnValue({ toPromise: () => Promise.reject('fail') });
    await service.delete(1);
    expect(toastr.error).toHaveBeenCalledWith('Error deleting data.');
  });
});
