// app/shims.server.ts
import { Buffer as NodeBuffer } from 'node:buffer';

// Ensure global Buffer exists in the Netlify/Node runtime (safe if it already exists)
if (!(globalThis as any).Buffer) {
  (globalThis as any).Buffer = NodeBuffer;
}
