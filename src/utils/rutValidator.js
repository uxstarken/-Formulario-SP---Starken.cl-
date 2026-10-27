/**
 * Chilean RUT formatter and validator
 */
export function formatRut(rut) {
  if (!rut) return '';
  // Clean dots, dashes and invalid characters
  let clean = rut.replace(/[^0-9kK]/g, '').toUpperCase();
  if (clean.length === 0) return '';
  
  if (clean.length === 1) return clean;

  const dv = clean.slice(-1);
  let body = clean.slice(0, -1);
  
  // Format body with dots
  let formattedBody = '';
  while (body.length > 3) {
    formattedBody = '.' + body.slice(-3) + formattedBody;
    body = body.slice(0, -3);
  }
  formattedBody = body + formattedBody;

  return `${formattedBody}-${dv}`;
}

export function validateRut(rut) {
  if (!rut) return false;
  const clean = rut.replace(/[^0-9kK]/g, '').toUpperCase();
  if (clean.length < 8 || clean.length > 9) return false;

  const dv = clean.slice(-1);
  const body = clean.slice(0, -1);

  let sum = 0;
  let multiplier = 2;

  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i], 10) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const expectedDv = 11 - (sum % 11);
  let calculatedDv = '';
  if (expectedDv === 11) calculatedDv = '0';
  else if (expectedDv === 10) calculatedDv = 'K';
  else calculatedDv = expectedDv.toString();

  return calculatedDv === dv;
}

/**
 * Validates a website URL
 */
export function isValidUrl(string) {
  if (!string || string.trim().length === 0) return false;
  
  let url = string.trim();
  // If user didn't type http/https, test if it looks like a valid domain
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }
  
  try {
    const parsed = new URL(url);
    // Must have a hostname with at least one dot (e.g. mitienda.cl, store.com)
    return parsed.hostname.includes('.') && parsed.hostname.length > 3;
  } catch {
    return false;
  }
}
