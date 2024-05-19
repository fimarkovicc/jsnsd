const express = require('express');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');

const resolveTargetUrl = (req) => {
	return req.query.url;
};

const validateUrl = (req, res, next) => {
	if (!req.query.url) {
		const err = new Error();
		err.status = 404;
		next(err);
		return;
	}
	next();
};

app.use('/', validateUrl, (req, res, next) => {
	createProxyMiddleware({
		target: resolveTargetUrl(req),
		changeOrigin: true,
	})(req, res, next);
});

app.all('*', (req, res, next) => {
	const err = new Error();
	err.status = 400;
	next(err);
});
app.use((err, req, res, next) => {
	res.status(err.status || 500).json({ err: err.message } || { err: 'error' });
});

app.listen(process.env.PORT || 3000);
