// BOAT_SERVICE_PORT=4000 BRAND_SERVICE_PORT=5000 PORT=3000 npm start
const express = require('express');
const createError = require('http-errors');
const timeout = require('connect-timeout');

const app = express();

const PORT = process.env.PORT || 3000;
const BOAT_SERVICE_PORT = process.env.BOAT_SERVICE_PORT || 4000;
const BRAND_SERVICE_PORT = process.env.BRAND_SERVICE_PORT || 5000;

app.use((req, res, next) => {
	res.setTimeout(1250, function () {
		next(createError(408, { message: 'request timed out' }));
	});
});

app.get('/:id', async (req, res, next) => {
	try {
		const id = req.params.id;
		if (!Number.isInteger(parseInt(id))) {
			next(createError(404, { message: 'not a number' }));
		}
		const boatRes = await fetch('http://localhos:' + BOAT_SERVICE_PORT + '/' + id);
		if (boatRes.status == 404) {
			next(createError(404));
		}

		if (
			boatRes.status >= 401 &&
			boatRes.status <= 499 &&
			![400, 404].includes(boatRes.status)
		) {
			next(createError(500));
		}
		const boat = await boatRes.json();

		const brand = await fetch('http://localhost:' + BRAND_SERVICE_PORT + '/' + boat.brand).then(
			(data) => data.json(),
		);
		res.status(200).json({ id: boat.id, color: boat.color, brand: brand.name });
	} catch (error) {
		next(createError(error));
	}
});

app.all('*', (req, res, next) => {
	next(createError(404));
});

app.use((err, req, res, next) => {
	res.status(err.status || 500).send(err.message || 'server error');
});

app.listen(PORT, () => {
	console.log('service running on port: ' + PORT);
});
