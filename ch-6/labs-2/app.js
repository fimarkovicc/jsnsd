const express = require('express');
const boatRouter = require('./routes/boat');
const createError = require('http-errors');

const app = express();
app.use(express.json());

app.use('/boat', boatRouter);

app.all('*', (req, res, next) => {
	next(createError(404));
});
app.use((err, req, res, next) => {
	res.status(err.status || 500).json({ error: err.message || 'error' });
});

app.listen(process.env.PORT);
