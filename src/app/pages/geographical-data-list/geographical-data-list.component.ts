import { Component } from '@angular/core';

const MOCK_DATA = [
  {
    openbareruimte: 'Hoofdstraat', huisnummer: 1, huisletter: '', huisnummertoevoeging: '', postcode: '1234AB',
    woonplaats: 'Amsterdam', gemeente: 'Amsterdam', provincie: 'Noord-Holland', nummeraanduiding: '1001',
    verblijfsobjectgebruiksdoel: 'Wonen', oppervlakteverblijfsobject: 80, verblijfsobjectstatus: 'Actief',
    object_id: 'OBJ001', object_type: 'Pand', nevenadres: '', pandid: 'PAND001', pandstatus: 'Bestaand',
    pandbouwjaar: 1990, x: 12345, y: 67890, lon: 4.895168, lat: 52.370216
  },
  {
    openbareruimte: 'Dorpsweg', huisnummer: 22, huisletter: 'A', huisnummertoevoeging: '', postcode: '5678CD',
    woonplaats: 'Rotterdam', gemeente: 'Rotterdam', provincie: 'Zuid-Holland', nummeraanduiding: '2002',
    verblijfsobjectgebruiksdoel: 'Kantoor', oppervlakteverblijfsobject: 150, verblijfsobjectstatus: 'Actief',
    object_id: 'OBJ002', object_type: 'Pand', nevenadres: '', pandid: 'PAND002', pandstatus: 'Bestaand',
    pandbouwjaar: 2005, x: 54321, y: 98765, lon: 4.47917, lat: 51.9225
  },
  {
    openbareruimte: 'Laan van Meerdervoort', huisnummer: 100, huisletter: '', huisnummertoevoeging: 'B', postcode: '9012EF',
    woonplaats: 'Den Haag', gemeente: 'Den Haag', provincie: 'Zuid-Holland', nummeraanduiding: '3003',
    verblijfsobjectgebruiksdoel: 'Winkel', oppervlakteverblijfsobject: 200, verblijfsobjectstatus: 'In gebruik',
    object_id: 'OBJ003', object_type: 'Pand', nevenadres: '', pandid: 'PAND003', pandstatus: 'Bestaand',
    pandbouwjaar: 1980, x: 67890, y: 12345, lon: 4.3007, lat: 52.0705
  }
];

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
  data = MOCK_DATA;
}
