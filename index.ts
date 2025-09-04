/* eslint-disable no-console */
import { createServer } from "https";
import { parse } from "url";
import * as fs from "node:fs";

import next from "next";

const port = 443;
const dev = false;
const app = next({ dev });
const handle = app.getRequestHandler();

const publicKeyPath = process.env.PUBLIC_KEY_PATH || "public.pem";
const privateKeyPath = process.env.PRIVATE_KEY_PATH || "private.key";

async function main() {
    await app.prepare();

    console.log(`Picked up public key: ${publicKeyPath}`);
    console.log(`Picked up private key: ${privateKeyPath}`);

    createServer(
        {
            key: fs.readFileSync(privateKeyPath),
            cert: fs.readFileSync(publicKeyPath)
        },
        (req, res) => {
            const parsedUrl = parse(req.url!, true);

            void handle(req, res, parsedUrl);
        }
    ).listen(port);

    console.log(`Server listening at localhost:${port}`);
}

void main();
