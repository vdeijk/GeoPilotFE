export function cleanOptionalFields(obj: Record<string, any>) {
  if (obj['oppervlakteverblijfsobject'] == null || isNaN(obj['oppervlakteverblijfsobject'])) {
    delete obj['oppervlakteverblijfsobject'];
  }
  if (obj['pandbouwjaar'] == null || isNaN(obj['pandbouwjaar'])) {
    delete obj['pandbouwjaar'];
  }
}
