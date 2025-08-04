import "./polyfills.server";
import type { AppLoadContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import "./shims/server";

const ABORT_DELAY = 5_000;

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: any,
  _loadContext: AppLoadContext
) {
  return new Promise<Response>((resolve, reject) => {
    let didError = false;

    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        onShellReady() {
          const body = new PassThrough();
          const headers = new Headers(responseHeaders);
          headers.set("Content-Type", "text/html");

          resolve(
            new Response(body as unknown as ReadableStream, {
              status: didError ? 500 : responseStatusCode,
              headers,
            })
          );

          pipe(body);
        },
        onShellError(err) {
          reject(err);
        },
        onError(err) {
          didError = true;
          console.error(err);
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
