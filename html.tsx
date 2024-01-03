import { Child } from "hono/jsx";

interface Properties {
  children: Child;
}

export function Html({ children }: Properties) {
  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>hola htmx</title>
        <script src="https://unpkg.com/htmx.org@1.9.10" />
      </head>
      <body>{children}</body>
    </html>
  );
}
