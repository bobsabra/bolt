// Use Node's native Web Streams for SSR (Remix's shims.server.ts)
import {
  ReadableStream,
  WritableStream,
  TransformStream,
} from "node:stream/web";

export { ReadableStream, WritableStream, TransformStream };
