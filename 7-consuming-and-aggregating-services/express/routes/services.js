const { Router } = require('express');
const createError = require('http-errors');

const router = Router();
const { BOAT_SERVICE_PORT = 4000, BRAND_SERVICE_PORT = 5000 } = process.env;
const boatSrv = `http://localhost:${BOAT_SERVICE_PORT}`;
const brandSrv = `http://localhost:${BRAND_SERVICE_PORT}`;

router.get('/:id', async (req, res, next) => {
	try {
		const id = req.params.id;
		const boat = await fetch(boatSrv + '/' + id).then((res) => res.json());

		const brandId = boat.brand;
		const brand = await fetch(brandSrv + '/' + brandId).then((res) => res.json());
		const item = {
			boatid: boat.id,
			color: boat.color,
			brand: brand.name,
		};
		res.send(item);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
