// Server-side shims for Web Streams
// Import directly from Node.js built-ins to avoid any aliasing issues
import { ReadableStream as NodeReadableStream, WritableStream as NodeWritableStream, TransformStream as NodeTransformStream } from "node:stream/web";

export { NodeReadableStream as ReadableStream, NodeWritableStream as WritableStream, NodeTransformStream as TransformStream };
