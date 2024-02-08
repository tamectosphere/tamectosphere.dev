import * as fs from "node:fs";
import * as path from "node:path";
import * as url from "node:url";

import { createRequestHandler } from "@remix-run/express";
import { fileURLToPath } from 'url'
import {
	broadcastDevReady,
	installGlobals,
} from '@remix-run/node'
import compression from "compression";
import express from "express";
import morgan from "morgan";
import sourceMapSupport from "source-map-support";
import chalk from 'chalk'
import { ip as ipAddress } from 'address'
import helmet from 'helmet'
import crypto from 'crypto'
import closeWithGrace from 'close-with-grace'

sourceMapSupport.install({
  retrieveSourceMap: function (source) {
    const match = source.startsWith("file://");
    if (match) {
      const filePath = url.fileURLToPath(source);
      const sourceMapPath = `${filePath}.map`;
      if (fs.existsSync(sourceMapPath)) {
        return {
          url: source,
          map: fs.readFileSync(sourceMapPath, "utf8"),
        };
      }
    }
    return null;
  },
});

installGlobals();

const MODE = process.env.NODE_ENV

/** @typedef {import('@remix-run/node').ServerBuild} ServerBuild */

const BUILD_PATH = path.resolve("build/index.js");
// const VERSION_PATH = path.resolve("build/version.txt");
const WATCH_PATH = '../build/version.txt'

/**
 * Initial build
 * @type {ServerBuild}
 */
const build = await import(BUILD_PATH)
let devBuild = build

const initialBuild = await reimportServer();
const app = express();

app.use(compression());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by");

// Remix fingerprints its assets so we can cache forever.
app.use(
  "/build",
  express.static("public/build", { immutable: true, maxAge: "1y" })
);

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static("public", { maxAge: "1h" }));


app.get(['/build/*', '/img/*', '/fonts/*', '/favicons/*'], (req, res) => {
	// if we made it past the express.static for these, then we're missing something.
	// So we'll just send a 404 and won't bother calling other middleware.
	return res.status(404).send('Not found')
})

morgan.token('url', (req) => decodeURIComponent(req.url ?? ''))
app.use(
	morgan('tiny', {
		skip: (req, res) =>
			res.statusCode === 200 &&
			(req.url?.startsWith('/resources/note-images') ||
				req.url?.startsWith('/resources/user-images') ||
				req.url?.startsWith('/resources/healthcheck')),
	}),
)

app.use((_, res, next) => {
	res.locals.cspNonce = crypto.randomBytes(16).toString('hex')
	next()
})

app.use(
	helmet({
		referrerPolicy: { policy: 'same-origin' },
		crossOriginEmbedderPolicy: false,
		contentSecurityPolicy: {
			// NOTE: Remove reportOnly when you're ready to enforce this CSP
			reportOnly: false,
			directives: {
				'font-src': ["'self'"],
				'frame-src': ["'self'"],
				'img-src': ["'self'", 'data:'],
				'script-src': [
					"'strict-dynamic'",
					"'self'",
					// @ts-expect-error
					(_, res) => `'nonce-${res.locals.cspNonce}'`,
				],
				'script-src-attr': [
					// @ts-expect-error
					(_, res) => `'nonce-${res.locals.cspNonce}'`,
				],
				'upgrade-insecure-requests': null,
			},
		},
	}),
)

function getRequestHandler(build) {
	function getLoadContext(_ , res) {
		return { cspNonce: res.locals.cspNonce }
	}
	return createRequestHandler({ build, mode: MODE, getLoadContext })
}

app.all(
	'*',
	MODE === 'development'
		? (...args) => getRequestHandler(devBuild)(...args)
		: getRequestHandler(build),
)

const portUsed = process.env.PORT || 3012;

const server = app.listen(portUsed, async () => {
  console.log(`🚀  TamEctosphere have liftoff!`);
  
  const localUrl = `http://localhost:${portUsed}`;
  let lanUrl = null;
  const localIp = ipAddress() ?? 'Unknown';

  if (/^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(localIp)) {
    lanUrl = `http://${localIp}:${portUsed}`;
  }

  const serverInfo = `${chalk.bold('Local:')} ${chalk.cyan(localUrl)}
${lanUrl ? `${chalk.bold('On Your Network:')} ${chalk.cyan(lanUrl)}` : ''}
${chalk.bold('Press Ctrl+C to stop')}`;

  console.log(serverInfo .trim());

  if (process.env.NODE_ENV === "development") {
    broadcastDevReady(initialBuild);
  }
});


/**
 * @returns {Promise<ServerBuild>}
 */
async function reimportServer() {
  const stat = fs.statSync(BUILD_PATH);

  // convert build path to URL for Windows compatibility with dynamic `import`
  const BUILD_URL = url.pathToFileURL(BUILD_PATH).href;

  // use a timestamp query parameter to bust the import cache
  return import(BUILD_URL + "?t=" + stat.mtimeMs);
}

closeWithGrace(async () => {
	await new Promise((resolve, reject) => {
		server.close(e => (e ? reject(e) : resolve('ok')))
	})
})

async function reloadBuild() {
		devBuild = await import(`${BUILD_PATH}?update=${Date.now()}`)
		broadcastDevReady(devBuild)
	}

// during dev, we'll keep the build module up to date with the changes
if (MODE === 'development') {
	
	// We'll import chokidar here so doesn't get bundled in production.
	const chokidar = await import('chokidar')

	const dirname = path.dirname(fileURLToPath(import.meta.url))
	const watchPath = path.join(dirname, WATCH_PATH).replace(/\\/g, '/')

	const buildWatcher = chokidar
		.watch(watchPath, { ignoreInitial: true })
		.on('add', reloadBuild)
		.on('change', reloadBuild)

	closeWithGrace(() => buildWatcher.close())
}

