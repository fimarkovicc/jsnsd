'use strict';
const express = require('express');
const app = express();
const router = express.Router();
const { PORT = 3000 } = process.env;
// const url = require('url');

router.get('/', (req, res, next) => {
	if (Array.isArray(req.query.un)) {
		res.status(400).end();
		return;
	}

	setTimeout(() => {
		res.send((req.query.un || '').toUpperCase());
	}, 1000);
});

app.use(router);

app.listen(PORT, () => {
	console.log(`Express server listening on ${PORT}`);
});
