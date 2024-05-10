const express = require('express');
const indexRoutes = require('./routes');

const app = express();

app.use('/', indexRoutes);

app.listen(process.env.PORT || 3000);
