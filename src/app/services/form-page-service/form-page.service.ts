import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import fields, { GeographicalFieldConfig } from '../../data/geographical-data';
import { normalizeNumberFields } from '../../common/utilities/normalize-number-fields';
import { cleanOptionalFields } from '../../common/utilities/clean-optional-fields';
import { ToastrService } from 'ngx-toastr';
import { GeographicalData } from '../../api/generated/model/geographicalData';
import { GeographicalDataService } from '../../api/generated/api/geographicalData.service';
import { TablePageService } from '../table-page-service/table-page.service';
import { CreateGeographicalDataDto } from '../../api/generated/model/createGeographicalDataDto';
import { UpdateGeographicalDataDto } from '../../api/generated/model/updateGeographicalDataDto';

@Injectable({ providedIn: 'root' })
export class FormPageService {
  private formSubject: BehaviorSubject<FormGroup>;
  private currentId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private geographicalDataService: GeographicalDataService,
    private tablePageService: TablePageService
  ) {
    // Build form group from field config
    const group: { [key in keyof GeographicalData]?: any } = {};
    (fields as GeographicalFieldConfig<GeographicalData>[])
      .filter((f) => f.showInForm)
      .forEach((field) => {
        group[field.key] = ['', field.required ? Validators.required : []];
      });
    // Always include the id field in the form group, but do not show in form UI
    group['id'] = [null];
    const form = this.fb.group(group);
    this.formSubject = new BehaviorSubject<FormGroup>(form);
  }

  // Returns the current form group
  get form(): FormGroup {
    return this.formSubject.value;
  }

  patchValue(value: Partial<GeographicalData>) {
    this.form.patchValue(value);
    if (value && value.id) {
      this.currentId = value.id;
    }
  }

  reset(value?: Partial<GeographicalData>) {
    this.form.reset(value);
    this.currentId = null;
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
        if (this.currentId) {
          await this.geographicalDataService.apiVersionGeographicalDataIdPut(
            this.currentId,
            '1',
            toUpdateGeographicalDataDto(transformed)
          ).toPromise();
          this.toastr.success('Data updated successfully!');
        } else {
          await this.geographicalDataService.apiVersionGeographicalDataPost(
            '1',
            toCreateGeographicalDataDto(transformed)
          ).toPromise();
          this.toastr.success('Data submitted successfully!');
        }
        this.tablePageService.fetchTableData();
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
      await this.geographicalDataService.apiVersionGeographicalDataIdDelete(id, '1').toPromise();
      this.toastr.success('Data deleted successfully!');
      this.tablePageService.fetchTableData();
      if (onSuccess) onSuccess();
    } catch (err) {
      this.toastr.error('Error deleting data.');
      console.error('Error deleting data:', err);
    }
  }
}

function toCreateGeographicalDataDto(data: GeographicalData): CreateGeographicalDataDto {
  return {
    openbareruimte: data.openbareruimte ?? '',
    huisnummer: Number(data.huisnummer),
    huisletter: data.huisletter ?? null,
    huisnummertoevoeging: data.huisnummertoevoeging ?? null,
    postcode: data.postcode ?? '',
    woonplaats: data.woonplaats ?? '',
    gemeente: data.gemeente ?? null,
    provincie: data.provincie ?? null,
    nummeraanduiding: data.nummeraanduiding ?? null,
    verblijfsobjectgebruiksdoel: data.verblijfsobjectgebruiksdoel ?? null,
    oppervlakteverblijfsobject: data.oppervlakteverblijfsobject ?? undefined,
    verblijfsobjectstatus: data.verblijfsobjectstatus ?? null,
    objectId: data.objectId ?? null,
    objectType: data.objectType ?? null,
    nevenadres: data.nevenadres ?? null,
    pandid: data.pandid ?? null,
    pandstatus: data.pandstatus ?? null,
    pandbouwjaar: data.pandbouwjaar ?? undefined,
    x: data.x ?? undefined,
    y: data.y ?? undefined,
    lon: data.lon ?? undefined,
    lat: data.lat ?? undefined
  };
}

function toUpdateGeographicalDataDto(data: GeographicalData): UpdateGeographicalDataDto {
  return {
    ...toCreateGeographicalDataDto(data),
    id: data.id ?? undefined
  };
}
