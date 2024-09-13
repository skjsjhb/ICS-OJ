/* eslint-disable no-console */
import { createServer } from "https";
import { parse } from "url";
import * as fs from "node:fs";

import next from "next";

const port = 443;
const dev = false;
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer(
      {
        key: fs.readFileSync("private.key"),
        cert: fs.readFileSync("public.pem"),
      },
      (req, res) => {
        const parsedUrl = parse(req.url!, true);

        void handle(req, res, parsedUrl);
      },
    ).listen(port);

    console.log(`> Server listening at localhost:${port}`);
  })
  .catch((e) => {
    console.log(e);
  });
