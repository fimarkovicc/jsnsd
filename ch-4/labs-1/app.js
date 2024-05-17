const express = require('express');
const path = require('path');
const profileRouter = require('./routes/profile');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/me', profileRouter);

app.listen(process.env.PORT || 3000);
