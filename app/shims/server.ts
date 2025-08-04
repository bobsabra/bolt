// app/shims/server.ts

// 1) Ensure TextEncoder/TextDecoder exist (some runtimes miss them)
import { TextEncoder, TextDecoder } from "node:util";
(globalThis as any).TextEncoder ||= TextEncoder;
(globalThis as any).TextDecoder ||= TextDecoder as unknown as typeof globalThis.TextDecoder;

// 2) Make sure global ReadableStream is Node's version (has .from)
import { ReadableStream as NodeReadableStream } from "node:stream/web";
if (
  typeof (globalThis as any).ReadableStream === "undefined" ||
  typeof (globalThis as any).ReadableStream.from !== "function"
) {
  (globalThis as any).ReadableStream = NodeReadableStream;
}

// (Optional but harmless) make sure Request/Response/Headers exist in case the
// runtime is missing them. Node 18+ should have these via undici.
(globalThis as any).Request ||= globalThis.Request;
(globalThis as any).Response ||= globalThis.Response;
(globalThis as any).Headers ||= globalThis.Headers;
