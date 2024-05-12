const data = require('./data.js');
const express = require('express');

const app = express();

app.get('/', async (req, res) => {
	const resdata = await data();
	res.send(resdata);
});

app.use((req, res) => {
	if (req.method == 'GET') res.sendStatus(404);
	res.sendStatus(405);
});

app.listen(process.env.PORT || 3000);
