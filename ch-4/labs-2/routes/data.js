const router = require('express').Router();
const stream = require('../stream');

router.get('/', (req, res, next) => {
	try {
		res.setHeader('Content-type', 'text/html');
		stream().pipe(res);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
