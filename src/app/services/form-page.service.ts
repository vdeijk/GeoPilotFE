import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import fields, { GeographicalFieldConfig } from '../data/GeographicalData';
import { normalizeNumberFields } from '../utility/normalize-number-fields';
import { cleanOptionalFields } from '../utility/clean-optional-fields';
import { ToastrService } from 'ngx-toastr';
import { GeographicalData } from '../api/generated/model/geographicalData';
import { GeographicalDataService } from '../api/generated/api/geographicalData.service';

@Injectable({ providedIn: 'root' })
export class FormPageService {
  private formSubject: BehaviorSubject<FormGroup>;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private geographicalDataService: GeographicalDataService
  ) {
    const group: { [key in keyof GeographicalData]?: any } = {};
    (fields as GeographicalFieldConfig<GeographicalData>[])
      .filter((f) => f.showInForm)
      .forEach((field) => {
        group[field.key] = ['', field.required ? Validators.required : []];
      });
    const form = this.fb.group(group);
    this.formSubject = new BehaviorSubject<FormGroup>(form);
  }

  get form(): FormGroup {
    return this.formSubject.value;
  }

  patchValue(value: Partial<GeographicalData>) {
    this.form.patchValue(value);
  }

  reset(value?: Partial<GeographicalData>) {
    this.form.reset(value);
  }

  async submit() {
    if (this.form.valid) {
      const formValue: GeographicalData = this.form.value;
      const transformed: GeographicalData = { ...formValue };
      normalizeNumberFields(transformed);
      if (transformed.huisnummer == null || isNaN(transformed.huisnummer as any)) {
        this.toastr.error('Huisnummer is required and must be a number.');
        return;
      }
      cleanOptionalFields(transformed);
      try {
        await this.geographicalDataService.apiGeographicalDataPost(transformed).toPromise();
        this.toastr.success('Data submitted successfully!');
      } catch (err) {
        this.toastr.error('Error submitting data.');
        console.error('Error submitting data:', err);
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  async delete(id: number, onSuccess?: () => void) {
    try {
      await this.geographicalDataService.apiGeographicalDataIdDelete(id).toPromise();
      this.toastr.success('Data deleted successfully!');
      if (onSuccess) onSuccess();
    } catch (err) {
      this.toastr.error('Error deleting data.');
      console.error('Error deleting data:', err);
    }
  }
}
