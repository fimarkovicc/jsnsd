const express = require('express');
const createError = require('http-errors');
const { Router } = express;
const model = require('./../../model.js');

const router = Router();

router.get('/:id', (req, res, next) => {
	try {
		model.bicycle.read(req.params.id, (err, data) => {
			if (!err) {
				res.status(200).json({ message: 'ok', bicycle: data });
			}
			next(createError(err));
		});
	} catch (e) {
		next(createError(e));
	}
});

router.post('/', function (req, res, next) {
	const id = model.bicycle.uid();

	model.bicycle.create(id, req.body, (err, id, item) => {
		if (err) {
			next(err);
		} else {
			res.status(201).send({ id, item });
		}
	});
});

router.post('/:id/update', function (req, res, next) {
	model.bicycle.update(req.params.id, req.body, (err, id, item) => {
		if (err) {
			if (err.message === 'not found') next();
			else next(err);
		} else {
			res.status(201).send({ id, item });
		}
	});
});

// router.put('/:id', function (req, res, next) {
// 	model.bicycle.create(req.params.id, req.body.data, (err) => {
// 		if (err) {
// 			if (err.message === 'resource exists') {
// 				model.bicycle.update(req.params.id, req.body.data, (err) => {
// 					if (err) next(err);
// 					else res.status(204).send();
// 				});
// 			} else {
// 				next(err);
// 			}
// 		} else {
// 			res.status(201).send({});
// 		}
// 	});
// });

// router.delete('/:id', function (req, res, next) {
// 	model.bicycle.del(req.params.id, (err) => {
// 		if (err) {
// 			if (err.message === 'not found') next();
// 			else next(err);
// 		} else {
// 			res.status(204).send();
// 		}
// 	});
// });

module.exports = router;
