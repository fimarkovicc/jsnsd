const express = require("express");
const createError = require("http-errors");
const model = require("./model.js");

function errorHandler(err, req, res) {}

const app = express();

app.get("/boat/:id", (req, res, next) => {
  const id = req.params.id;
  model.boat.read(id, (err, data) => {
    if (err) {
      next(createError(err));
      return;
    }
    res.status(200).json(data);
  });
});

// error handling
app.use((req, res, next) => {
  if (req.method != "GET") {
    next(createError(405));
    return;
  }
  next(createError(404));
});

// handle all errors
app.use((err, req, res, next) => {
  if (err.code == "E_NOT_FOUND") {
    // this should probably be handled in the previous error handling middlewear
    res.status(404).send("not found");
    return;
  }
  res.status(err.status || 500);
  res.send(err.message || "Server Error");
});

app.listen(process.env.PORT || 3000);
