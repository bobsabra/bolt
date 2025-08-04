// Runtime polyfills for serverless environment
import { Buffer } from 'buffer';
import process from 'process';

// Ensure Buffer is available globally
if (typeof globalThis.Buffer === 'undefined') {
  globalThis.Buffer = Buffer;
}

// Ensure process is available globally  
if (typeof globalThis.process === 'undefined') {
  globalThis.process = process;
}

// Export for explicit imports
export { Buffer, process };
