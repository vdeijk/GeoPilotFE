import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormPageService {
  private formSubject: BehaviorSubject<FormGroup>;

  constructor(private fb: FormBuilder) {
    const form = this.fb.group({
      // Example fields, adjust as needed
      name: ['', Validators.required],
      description: ['']
    });
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

  patchValue(value: Partial<{ name: string; description: string }>) {
    this.form.patchValue(value);
  }

  reset(value?: any) {
    this.form.reset(value);
  }
}
