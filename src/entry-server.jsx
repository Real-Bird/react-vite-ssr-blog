import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./App";
import { StaticRouter } from "react-router-dom/server";
import { createCache, StyleProvider, extractStyle } from "@ant-design/cssinjs";

export function render(url) {
  const cache = createCache();
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={"/" + url}>
        <StyleProvider cache={cache}>
          <App />
        </StyleProvider>
      </StaticRouter>
    </React.StrictMode>
  );
  const styleText = extractStyle(cache);
  const meta = `<meta name="author" content="real-bird" />`;
  return {
    html,
    head: [meta, styleText],
  };
}
