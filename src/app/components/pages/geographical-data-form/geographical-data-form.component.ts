import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormPageService } from '../../../services/form-page-service/form-page.service';
import { GeographicalData } from '../../../api/generated/model/geographicalData';
import { firstValueFrom } from 'rxjs';
import { GeographicalDataService } from '../../../api/generated/api/geographicalData.service';

@Component({
  selector: 'app-geographical-data-form',
  templateUrl: './geographical-data-form.component.html',
  styleUrls: ['./geographical-data-form.component.scss'],
})
export class GeographicalDataFormComponent implements OnInit {
  isEditMode = false;
  id: string | null = null;

  constructor(
    public formPageService: FormPageService,
    private route: ActivatedRoute,
    private router: Router,
    private geographicalDataService: GeographicalDataService
  ) {}

  // Initializes form state based on route params
  async ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      this.id = params.get('id');
      this.isEditMode = !!this.id;
      if (this.isEditMode && this.id) {
        const data = await firstValueFrom(
          this.geographicalDataService.apiVersionGeographicalDataIdGet(
            Number(this.id),
            '1'
          )
        );
        if (data) {
          this.formPageService.patchValue(data);
        }
      } else {
        this.formPageService.reset(); // Always reset form when in add mode
      }
    });
  }

  // Deletes the current item and navigates back to list
  onDelete() {
    if (this.id) {
      this.formPageService.delete(Number(this.id), () => {
        this.router.navigate(['/']);
      });
    }
  }
}
