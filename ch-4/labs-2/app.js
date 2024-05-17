const express = require('express');
const createError = require('http-errors');
const dataRouter = require('./routes/data');

const app = express();

app.use('/data', dataRouter);

app.all('*', (req, res, next) => {
	next(createError(400, 'not found'));
});
app.use((err, req, res, next) => {
	res.status(err.status || 500).send(err.message || 'error');
});

app.listen(process.env.PORT || 3000);
