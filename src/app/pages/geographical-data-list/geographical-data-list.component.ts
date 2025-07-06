import { Component } from '@angular/core';
import { TablePageService } from '../../stores/TablePage.service';

@Component({
  selector: 'app-geographical-data-list',
  templateUrl: './geographical-data-list.component.html',
  styleUrls: ['./geographical-data-list.component.scss']
})
export class GeographicalDataListComponent {
  columns = [
    'openbareruimte', 'huisnummer', 'huisletter', 'huisnummertoevoeging', 'postcode',
    'woonplaats', 'gemeente', 'provincie', 'nummeraanduiding', 'verblijfsobjectgebruiksdoel',
    'oppervlakteverblijfsobject', 'verblijfsobjectstatus', 'object_id', 'object_type',
    'nevenadres', 'pandid', 'pandstatus', 'pandbouwjaar', 'x', 'y', 'lon', 'lat'
  ];
  data: any[] = [];

  constructor(private tablePageService: TablePageService) {
    this.tablePageService.data$.subscribe(apiData => {
      this.data = apiData;
    });
  }
}
