const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.status(200).send({});
});
app.post('/', (req, res) => {
	res.status(405).send({});
});

app.listen(process.env.PORT || 3000);
