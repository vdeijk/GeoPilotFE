import { GeographicalData } from '../../api/generated/model/geographicalData';

export function validateRequiredFields(obj: GeographicalData): boolean {
  if (obj.huisnummer == null || Number.isNaN(obj.huisnummer)) {
    alert('Huisnummer is required and must be a number.');
    return false;
  }
  return true;
}
