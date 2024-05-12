const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
	res.status(200).send({});
});

router.post('/', (req, res) => {
	res.status(405);
	res.end();
});

module.exports = router;
