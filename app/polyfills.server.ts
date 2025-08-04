// Force Buffer to be available immediately 
import { Buffer } from 'buffer';

// Set Buffer globally BEFORE anything else can run
globalThis.Buffer = Buffer;

// Also ensure isBuffer method is available
if (!globalThis.Buffer.isBuffer) {
  globalThis.Buffer.isBuffer = Buffer.isBuffer;
}

// Make sure it's also available on the global object
if (typeof global !== 'undefined') {
  global.Buffer = Buffer;
}
