import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EndpointService } from '../../api/endpoint.service';

@Component({
  selector: 'app-geographical-data-form',
  templateUrl: './geographical-data-form.component.html',
  styleUrls: ['./geographical-data-form.component.scss']
})
export class GeographicalDataFormComponent implements OnInit {
  formData = {
    openbareruimte: '',
    huisnummer: '',
    huisletter: '',
    huisnummertoevoeging: '',
    postcode: '',
    woonplaats: '',
    gemeente: '',
    provincie: '',
    nummeraanduiding: '',
    verblijfsobjectgebruiksdoel: '',
    oppervlakteverblijfsobject: '',
    verblijfsobjectstatus: '',
    object_id: '',
    object_type: '',
    nevenadres: '',
    pandid: '',
    pandstatus: '',
    pandbouwjaar: '',
    x: '',
    y: '',
    lon: '',
    lat: ''
  };
  isEditMode = false;
  id: string | null = null;

  constructor(private route: ActivatedRoute, private endpointService: EndpointService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.isEditMode = !!this.id;
      if (this.isEditMode && this.id) {
        // Replace 'geodata' with your actual endpoint name
        this.endpointService.getData<any>('geodata', this.id).subscribe((data: any) => {
          if (data) {
            this.formData = { ...this.formData, ...data };
          }
        });
      }
    });
  }
}
