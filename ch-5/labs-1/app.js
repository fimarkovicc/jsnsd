const express = require('express');
const createError = require('http-errors');

const boatRouter = require('./routes/boat');

const app = express();

app.use('/boat', boatRouter);

app.all('*', (req, res, next) => {
	next(createError(404));
});
app.use((err, req, res, next) => {
	res.status(err.status || 500).send(err.message || 'error');
});

app.listen(process.env.PORT);
