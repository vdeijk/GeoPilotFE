import fields from '../data/GeographicalData';
import { GeographicalData } from '../api/generated/model/geographicalData';

type NumberKeys = Extract<{
  [K in keyof GeographicalData]: GeographicalData[K] extends number | null | undefined ? K : never
}[keyof GeographicalData], string>;

const numberKeys: NumberKeys[] = [
  'id',
  'huisnummer',
  'huisnummertoevoeging',
  'oppervlakteverblijfsobject',
  'pandbouwjaar',
  'x',
  'y',
  'lon',
  'lat',
];

export function normalizeNumberFields(obj: GeographicalData) {
  numberKeys.forEach(key => {
    if (obj[key] === undefined || obj[key] === null) {
      obj[key] = undefined;
    } else if (typeof obj[key] !== 'number') {
      const n = Number(obj[key]);
      obj[key] = isNaN(n) ? undefined : n;
    }
  });
}
