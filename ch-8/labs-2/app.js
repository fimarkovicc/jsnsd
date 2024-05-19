const http = require('http');
const https = require('https');
const url = require('url');

const PORT = 3000;
const DEST_URL = 'https://jsonplaceholder.typicode.com';

const server = http.createServer((req, res) => {
	const options = {
		hostname: url.parse(DEST_URL).hostname,
		port: 443,
		path: req.url,
		method: req.method,
		headers: req.headers,
	};

	const proxyReq = https.request(options, (proxyRes) => {
		res.writeHead(proxyRes.statusCode, proxyRes.headers);
		proxyRes.pipe(res, {
			end: true,
		});
	});

	proxyReq.on('error', (err) => {
		console.error('Proxy Request Error:', err);
		res.statusCode = 500;
		res.end('Proxy Request Error');
	});

	req.pipe(proxyReq, {
		end: true,
	});
});

server.on('error', (err) => {
	console.error('Server Error:', err);
});

server.listen(PORT, () => {
	console.log(`Proxy server running on port ${PORT}`);
});
