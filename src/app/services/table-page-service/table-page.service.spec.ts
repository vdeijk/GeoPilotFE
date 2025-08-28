import { TestBed } from '@angular/core/testing';
import { TablePageService } from './table-page.service';
import { GeographicalDataService } from '../../api/generated';
import { LoadingService } from '../loading-service/loading.service';
import { of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';

class MockGeoService {
  apiV1GeographicalDataGet = jasmine
    .createSpy('get')
    .and.returnValue(of([{ id: 1 }]));
}
class MockLoadingService {
  setLoading = jasmine.createSpy('setLoading');
}

describe('TablePageService', () => {
  let service: TablePageService;
  let geoService: MockGeoService;
  let loadingService: MockLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TablePageService,
        { provide: GeographicalDataService, useClass: MockGeoService },
        { provide: LoadingService, useClass: MockLoadingService },
      ],
    });
    service = TestBed.inject(TablePageService);
    geoService = TestBed.inject(GeographicalDataService) as any;
    loadingService = TestBed.inject(LoadingService) as any;
  });

  it('should create the service and fetch data on init', () => {
    expect(service).toBeTruthy();
    expect(geoService.apiV1GeographicalDataGet).toHaveBeenCalled();
  });

  it('should update data$ and loading state on fetchTableData', (done) => {
    service.data$.pipe(take(1)).subscribe((data) => {
      expect(data.length).toBe(1);
      expect(loadingService.setLoading).toHaveBeenCalledWith(false);
      done();
    });
    service.fetchTableData();
  });

  it('should handle API errors gracefully', () => {
    geoService.apiV1GeographicalDataGet.and.returnValue(
      throwError(() => new Error('fail'))
    );
    spyOn(console, 'error');
    service.fetchTableData();
    expect(loadingService.setLoading).toHaveBeenCalledWith(false);
    expect(console.error).toHaveBeenCalled();
  });
});
