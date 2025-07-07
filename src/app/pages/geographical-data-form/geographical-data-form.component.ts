import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EndpointService } from '../../services/endpoint.service';
import { FormPageService } from '../../services/form-page.service';

@Component({
  selector: 'app-geographical-data-form',
  templateUrl: './geographical-data-form.component.html',
  styleUrls: ['./geographical-data-form.component.scss'],
})
export class GeographicalDataFormComponent implements OnInit {
  isEditMode = false;
  id: string | null = null;

  constructor(
    private route: ActivatedRoute,
    public endpointService: EndpointService,
    public formPageService: FormPageService, 
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.isEditMode = !!this.id;
      if (this.isEditMode && this.id) {
        this.endpointService
          .getData<any>('GeographicalData', this.id)
          .subscribe((data: any) => {
            if (data) {
              this.formPageService.patchValue(data);
            }
          });
      }
    });
  }

  onDelete() {
    if (this.id) {
      this.formPageService.delete(this.endpointService, Number(this.id), () => {
        this.router.navigate(['/']);
      });
    }
  }
}
