export function validateRequiredFields(obj: Record<string, any>): boolean {
  if (obj['huisnummer'] == null || isNaN(obj['huisnummer'])) {
    alert('Huisnummer is required and must be a number.');
    return false;
  }
  return true;
}
