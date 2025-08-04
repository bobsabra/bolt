// Fixed shims for server-side rendering
// Use Node.js built-in streams directly
export const ReadableStream = globalThis.ReadableStream || (await import("node:stream/web")).ReadableStream;
export const WritableStream = globalThis.WritableStream || (await import("node:stream/web")).WritableStream;
export const TransformStream = globalThis.TransformStream || (await import("node:stream/web")).TransformStream;
