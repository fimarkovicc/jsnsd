const express = require('express');
const createError = require('http-errors');
const bicycleRouter = require('./routes/bicycle/');
const servicesRouter = require('./routes/services.js');
// const bicycleServiceRouter = require('./routes/bicycle-service.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/bicycle', bicycleRouter);
app.use('/services', servicesRouter);
// app.use('/bicycle-service', bicycleServiceRouter);

// handles any not found routes
app.all('*', (req, res, next) => {
	next(createError(404, 'no route found'));
});

// handles all errors
app.use((err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.message = err.message || 'Server error';
	res.status(err.statusCode).json({ code: err.statusCode, message: err.message });
});

app.listen(process.env.PORT || 3000);
