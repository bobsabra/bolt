- // server shim (currently pulling browser polyfill)
- import { ReadableStream, WritableStream, TransformStream } from "stream-browserify/web";
- export { ReadableStream, WritableStream, TransformStream };

+ // Use Node's native Web Streams for SSR
+ import {
+   ReadableStream,
+   WritableStream,
+   TransformStream,
+ } from "node:stream/web";
+
+ export { ReadableStream, WritableStream, TransformStream };
