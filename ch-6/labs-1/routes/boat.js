const router = require('express').Router();
const createError = require('http-errors');
const model = require('./../model');

router.post('/', (req, res, next) => {
	if (req.headers['content-type'] != 'application/json') {
		next(createError(500, 'not json'));
		return;
	}

	const newBoatId = model.boat.uid();
	const newBoat = req.body.data;

	model.boat.create(newBoatId, newBoat, (err, id) => {
		if (err) {
			next(createError(500, err.message));
			return;
		}
		res.status(201).send({ id });
	});
});
router.get('/:id', (req, res, next) => {
	const id = req.params.id;
	model.boat.read(id, (err, boat) => {
		if (err) {
			next(createError(err.status || 500, err.message));
			return;
		}
		res.status(200).send(boat);
	});
});

module.exports = router;
