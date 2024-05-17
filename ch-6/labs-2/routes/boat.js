const router = require('express').Router();
const createError = require('http-errors');
const model = require('./../model');

router.delete('/:id', (req, res, next) => {
	const id = req.params.id;
	model.boat.del(id, (err) => {
		if (err) {
			next(createError(err.code == 'E_NOT_FOUND' ? 404 : 500, err.message));
			return;
		}
		res.status(204).end();
	});
});

router.get('/:id', (req, res, next) => {
	model.boat.read(req.params.id, (err, boat) => {
		if (err) {
			next(createError(404, err.message));
			return;
		}
		res.status(200).json(boat);
	});
});

module.exports = router;
