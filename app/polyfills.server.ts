// Import buffer polyfill
import { Buffer } from 'buffer';

// Force Buffer to be available globally
if (typeof globalThis.Buffer === 'undefined') {
  globalThis.Buffer = Buffer;
}

if (typeof global !== 'undefined' && typeof global.Buffer === 'undefined') {
  global.Buffer = Buffer;
}

// Ensure process is available
if (typeof globalThis.process === 'undefined') {
  globalThis.process = { env: {} } as any;
}

// Additional safety check
if (!Buffer.isBuffer) {
  Buffer.isBuffer = function(obj: any): obj is Buffer {
    return obj != null && obj._isBuffer === true;
  };
}
