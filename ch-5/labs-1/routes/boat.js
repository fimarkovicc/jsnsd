const router = require('express').Router();
const createError = require('http-errors');

const model = require('../model.js');

router.get('/:id', (req, res, next) => {
	const id = req.params.id;
	model.boat.read(id, (err, boat) => {
		if (err) {
			// console.log(err.status, err.message);
			err.message == 'unknown' ? next(createError(500)) : next(createError(404));
			return;
		}
		res.setHeader('Content-type', 'application/json');
		res.json(boat);
	});
});

module.exports = router;
