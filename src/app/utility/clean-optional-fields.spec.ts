import { cleanOptionalFields } from './clean-optional-fields';
import { GeographicalData } from '../api/generated/model/geographicalData';

describe('cleanOptionalFields', () => {
  it('should delete optional number fields if null', () => {
    const obj: GeographicalData = { oppervlakteverblijfsobject: undefined, pandbouwjaar: null as any };
    cleanOptionalFields(obj);
    expect('oppervlakteverblijfsobject' in obj).toBe(false);
    expect('pandbouwjaar' in obj).toBe(false);
  });

  it('should delete optional number fields if NaN', () => {
    const obj: GeographicalData = { oppervlakteverblijfsobject: NaN };
    cleanOptionalFields(obj);
    expect('oppervlakteverblijfsobject' in obj).toBe(false);
  });

  it('should not delete valid numbers', () => {
    const obj: GeographicalData = { oppervlakteverblijfsobject: 123 };
    cleanOptionalFields(obj);
    expect(obj.oppervlakteverblijfsobject).toBe(123);
  });
});
