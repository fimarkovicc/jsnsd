const express = require('express');
const data = require('./data');

const app = express();
app.get('/', async (req, res, next) => {
	try {
		res.send(await data());
	} catch (err) {
		next(err);
	}
});

app.use('*', (req, res, next) => {
	const err = new Error('not found');
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500).send(err.message || 'error');
});

app.listen(process.env.PORT || 3000);
