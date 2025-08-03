// app/shims/server.ts
// Make Node globals available to the server bundle (Netlify Functions).

import { Buffer } from "node:buffer";
import { Readable } from "node:stream";

// Only set them if they aren't already present.
if (!(globalThis as any).Buffer) (globalThis as any).Buffer = Buffer;
if (!(globalThis as any).Readable) (globalThis as any).Readable = Readable;
