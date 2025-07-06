import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EndpointService } from '../../api/endpoint.service';
import { FormPageService } from '../../stores/FormPage.service';

@Component({
  selector: 'app-geographical-data-form',
  templateUrl: './geographical-data-form.component.html',
  styleUrls: ['./geographical-data-form.component.scss'],
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
    lat: '',
  };
  isEditMode = false;
  id: string | null = null;

  constructor(
    private route: ActivatedRoute,
    public endpointService: EndpointService, // Make public for template access
    public formPageService: FormPageService // Make public for template access
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.isEditMode = !!this.id;
      if (this.isEditMode && this.id) {
        this.endpointService
          .getData<any>('geodata', this.id)
          .subscribe((data: any) => {
            if (data) {
              this.formData = { ...this.formData, ...data };
            }
          });
      }
    });
  }

  submit() {
    if (this.formPageService.form.valid) {
      const formValue = this.formPageService.form.value;
      this.endpointService.postData<any>('geodata', formValue).subscribe({
        next: (response) => {
          // Handle success (e.g., show a message, navigate, etc.)
          console.log('Data submitted successfully:', response);
        },
        error: (err) => {
          // Handle error (e.g., show error message)
          console.error('Error submitting data:', err);
        },
      });
    } else {
      // Optionally mark all fields as touched to show validation errors
      this.formPageService.form.markAllAsTouched();
    }
  }
}
