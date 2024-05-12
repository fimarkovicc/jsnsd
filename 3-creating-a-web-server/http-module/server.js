const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
	const start = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h1>Start</h1>
        <a href="/page-1">page 1</a>
    </body>
    </html>`;

	const page1 = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h1>Page 1</h1>
        <a href="/">start</a>
    </body>
    </html>`;

	if (req.method != 'GET') {
		res.statusCode = 405;
		res.end(http.STATUS_CODES[405]);
		return;
	}

	const { pathname } = url.parse(req.url);
	console.log(pathname);

	if (pathname == '/') {
		res.statusCode = 200;
		res.end(start);
		return;
	}
	if (pathname == '/page-1') {
		res.statusCode = 200;
		res.end(page1);
		return;
	}
	res.statusCode = 404;
	res.end('not found');
});

server.listen(process.env.PORT || 3000, () => {
	console.log('running');
});
