import { normalizeNumberFields } from './normalize-number-fields';
import { GeographicalData } from '../api/generated/model/geographicalData';

describe('normalizeNumberFields', () => {
  it('should convert string numbers to numbers', () => {
    const obj: GeographicalData = { huisnummer: '42' as any };
    normalizeNumberFields(obj);
    expect(obj.huisnummer).toBe(42);
  });

  it('should set NaN or invalid values to undefined', () => {
    const obj: GeographicalData = { huisnummer: 'abc' as any };
    normalizeNumberFields(obj);
    expect(obj.huisnummer).toBeUndefined();
  });

  it('should leave valid numbers unchanged', () => {
    const obj: GeographicalData = { huisnummer: 7 };
    normalizeNumberFields(obj);
    expect(obj.huisnummer).toBe(7);
  });

  it('should set null or undefined to undefined', () => {
    const obj: GeographicalData = { huisnummer: null as any };
    normalizeNumberFields(obj);
    expect(obj.huisnummer).toBeUndefined();
  });
});
