require("dotenv").config();

const { parse } = require("url");
const fs = require("fs");
// const { createServer } = require("http");
const https = require("https");
const next = require("next");

const hostname = process.env.APPS_DOMAIN;
const port = parseInt(process.env.APPS_PORT) || 443;
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOption = {
  key: fs.readFileSync("./certificates/localhost.key", "utf8"),
  cert: fs.readFileSync("./certificates/localhost.crt"),
};

app
  .prepare()
  .then(() => {
    https
      .createServer(httpsOption, async (req, res) => {
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
      })
      .once("error", (err) => {
        console.error(err);
        process.exit(1);
      })
      .listen(port, () => {
        console.log(
          `> Ready on ${hostname}:${port} - env ${process.env.NODE_ENV}`,
        );
      });
  })
  .catch((err) => {
    console.log("Error::::", err);
  });
