const router = require('express').Router();

router.get('/', (req, res) => {
	res.render('layout', { name: 'Filip' });
});

module.exports = router;
