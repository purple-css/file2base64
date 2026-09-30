const encoder = new TextEncoder();
const decoder = new TextDecoder('utf-8', { fatal: true });

export function textToBytes(text) { return encoder.encode(text); }

export function bytesToBase64(bytes) {
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

export function textToBase64(text) { return bytesToBase64(textToBytes(text)); }

export function base64ToBytes(base64) {
  const normalized = base64.replace(/\s/g, '');
  if (!normalized || !/^[A-Za-z0-9+/]*={0,2}$/.test(normalized) || normalized.length % 4 === 1) {
    throw new Error('Invalid Base64 input.');
  }
  try {
    const binary = atob(normalized);
    return Uint8Array.from(binary, character => character.charCodeAt(0));
  } catch { throw new Error('Invalid Base64 input.'); }
}

export function base64ToText(base64) {
  try { return decoder.decode(base64ToBytes(base64)); }
  catch { throw new Error('Invalid Base64 input.'); }
}

export async function fileToBase64(file) { return bytesToBase64(new Uint8Array(await file.arrayBuffer())); }
export function createDataUri(mimeType, base64) { return `data:${mimeType || 'application/octet-stream'};base64,${base64}`; }
