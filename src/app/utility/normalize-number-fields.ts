import fields from '../data/GeographicalData';

export function normalizeNumberFields(obj: Record<string, any>) {
  (fields as any[]).forEach(field => {
    if (field.type === 'number') {
      if (obj[field.key] === '' || obj[field.key] === undefined) {
        obj[field.key] = null;
      } else if (typeof obj[field.key] !== 'number') {
        const n = Number(obj[field.key]);
        obj[field.key] = isNaN(n) ? null : n;
      }
    }
  });
}
