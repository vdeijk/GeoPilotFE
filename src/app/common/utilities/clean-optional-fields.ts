import { GeographicalData } from '../../api/generated/model/geographicalData';

const optionalNumberFields: (keyof GeographicalData)[] = [
  'oppervlakteverblijfsobject',
  'pandbouwjaar',
];

export function cleanOptionalFields(obj: GeographicalData) {
  optionalNumberFields.forEach(key => {
    if (obj[key] == null || Number.isNaN(obj[key])) {
      delete obj[key];
    }
  });
}
