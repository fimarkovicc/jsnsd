const express = require("express");

const dataRouter = require("./routes/data");

const app = express();
app.use("/data", dataRouter);

app.listen(3000);
