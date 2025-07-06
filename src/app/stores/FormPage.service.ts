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
       console.log('valid:', this.form.value);
      endpointService.postData('geodata', formValue).subscribe({
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
}
