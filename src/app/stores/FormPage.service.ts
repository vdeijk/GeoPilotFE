import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import fields from '../data/GeographicalData';
import { normalizeNumberFields } from '../utility/normalize-number-fields';
import { cleanOptionalFields } from '../utility/clean-optional-fields';
import { ToastrService } from 'ngx-toastr';
import { GeographicalData } from '../api/generated/model/geographicalData';

@Injectable({ providedIn: 'root' })
export class FormPageService {
  private formSubject: BehaviorSubject<FormGroup>;

  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    const group: { [key: string]: any } = {};
    (fields as any[])
      .filter((f: any) => f.showInForm)
      .forEach((field: any) => {
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

  async submit(endpointService: any) {
    if (this.form.valid) {
      const formValue: GeographicalData = this.form.value;
      const transformed: GeographicalData = { ...formValue };
      normalizeNumberFields(transformed as any);
      if (transformed.huisnummer == null || isNaN(transformed.huisnummer as any)) {
        this.toastr.error('Huisnummer is required and must be a number.');
        return;
      }
      cleanOptionalFields(transformed as any);
      const payload = { geographicalData: transformed };
      try {
        await endpointService.postData('GeographicalData', payload).toPromise();
        this.toastr.success('Data submitted successfully!');
      } catch (err) {
        this.toastr.error('Error submitting data.');
        console.error('Error submitting data:', err);
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  async delete(endpointService: any, id: number, onSuccess?: () => void) {
    if (!id) {
      this.toastr.error('No ID provided for deletion.');
      return;
    }
    if (!confirm('Are you sure you want to delete this record?')) {
      return;
    }
    try {
      await endpointService.deleteData('GeographicalData', id).toPromise();
      this.toastr.success('Record deleted successfully!');
      this.reset();
      if (onSuccess) onSuccess();
    } catch (err) {
      this.toastr.error('Failed to delete record.');
      console.error('Error deleting record:', err);
    }
  }
}
