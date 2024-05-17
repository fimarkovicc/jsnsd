const express = require('express');
const createError = require('http-errors');

const { BOAT_SERVICE_PORT, BRAND_SERVICE_PORT } = process.env;

const app = express();
app.use((req, res, next) => {
	res.setTimeout(1250, () => next(createError(408)));
	next();
});
app.get('/:id', async (req, res, next) => {
	try {
		const id = req.params.id;

		const boatRes = await fetch(`http://localhost:${BOAT_SERVICE_PORT}/${id}`);
		if (boatRes.status != 200) {
			next(createError(boatRes.status));
			return;
		}
		const boat = await boatRes.json();

		const brandRes = await fetch(`http://localhost:${BRAND_SERVICE_PORT}/${boat.brand}`);
		if (brandRes.status != 200) {
			next(createError(brandRes.status));
			return;
		}
		const brand = await brandRes.json();

		const response = { id: Number(id), color: boat.color, brand: brand.name };

		res.status(200).json(response);
	} catch (error) {
		next(createError(500));
	}
});

app.all('*', (req, res, next) => {
	next(createError(404));
});
app.use((err, req, res, next) => {
	res.status(err.status || 500).json({ error: err.message || 'error' });
});

app.listen(process.env.PORT);
