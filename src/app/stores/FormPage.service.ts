import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import fields from '../data/GeographicalData';

@Injectable({ providedIn: 'root' })
export class FormPageService {
  private formSubject: BehaviorSubject<FormGroup>;

  constructor(private fb: FormBuilder) {
    const group: { [key: string]: any } = {};
    (fields as any[])
      .filter((f: any) => f.showInForm)
      .forEach((field: any) => {
        group[field.key] = ['', field.required ? Validators.required : []];
      });
    const form = this.fb.group(group);
    this.formSubject = new BehaviorSubject<FormGroup>(form);
  }

  get form$() {
    return this.formSubject.asObservable();
  }

  get form(): FormGroup {
    return this.formSubject.value;
  }

  get value$() {
    return this.form.valueChanges;
  }

  patchValue(value: Partial<Record<string, any>>) {
    this.form.patchValue(value);
  }

  reset(value?: any) {
    this.form.reset(value);
  }

  submit(endpointService: any) {
    console.log('Submitting form with value:', this.form.value);
    if (this.form.valid) {
      const formValue = this.form.value;
      // Transform formValue: set empty string for number fields to null
      const transformed: Record<string, any> = { ...formValue };
      (fields as any[]).forEach(field => {
        if (field.type === 'number') {
          if (transformed[field.key] === '' || transformed[field.key] === undefined) {
            transformed[field.key] = null;
          } else if (typeof transformed[field.key] !== 'number') {
            // Try to coerce to number if not already
            const n = Number(transformed[field.key]);
            transformed[field.key] = isNaN(n) ? null : n;
          }
          // If still not a number, set to null
          if (transformed[field.key] !== null && typeof transformed[field.key] !== 'number') {
            transformed[field.key] = null;
          }
        }
      });
      // Ensure required number fields are valid integers (not null or NaN)
      if (transformed['huisnummer'] == null || isNaN(transformed['huisnummer'])) {
        alert('Huisnummer is required and must be a number.');
        return;
      }
      if (transformed['oppervlakteverblijfsobject'] == null || isNaN(transformed['oppervlakteverblijfsobject'])) {
        delete transformed['oppervlakteverblijfsobject']; // Remove if not filled, since not required in minimal form
      }
      // Remove invalid number fields (e.g., pandbouwjaar)
      if (transformed['pandbouwjaar'] == null || isNaN(transformed['pandbouwjaar'])) {
        delete transformed['pandbouwjaar'];
      }
      // Wrap payload for backend
      // Use correct controller route: GeographicalData (not geodata)
      const payload = { geographicalData: transformed };
      console.log('Transformed for backend:', payload);
      endpointService.postData('GeographicalData', payload).subscribe({
        next: (response: any) => {
          console.log('Data submitted successfully:', response);
        },
        error: (err: any) => {
          console.error('Error submitting data:', err);
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  delete(endpointService: any, id: number, onSuccess?: () => void) {
    if (!id) {
      alert('No ID provided for deletion.');
      return;
    }
    if (!confirm('Are you sure you want to delete this record?')) {
      return;
    }
    endpointService.deleteData('GeographicalData', id).subscribe({
      next: (response: any) => {
        console.log('Record deleted successfully:', response);
        this.reset();
        if (onSuccess) onSuccess();
      },
      error: (err: any) => {
        console.error('Error deleting record:', err);
        alert('Failed to delete record.');
      }
    });
  }
}
