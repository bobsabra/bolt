// app/shims/server.ts

import { TextEncoder, TextDecoder } from "node:util";
(globalThis as any).TextEncoder ||= TextEncoder;
(globalThis as any).TextDecoder ||= TextDecoder as unknown as typeof globalThis.TextDecoder;

// IMPORTANT: use *node:* prefix so SSR uses Node's builtin, not a browser polyfill
import { ReadableStream as NodeReadableStream } from "node:stream/web";

if (
  typeof (globalThis as any).ReadableStream === "undefined" ||
  typeof (globalThis as any).ReadableStream.from !== "function"
) {
  (globalThis as any).ReadableStream = NodeReadableStream;
}
