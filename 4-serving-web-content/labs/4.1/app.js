const express = require("express");
const path = require("path");
const meRouter = require("./routes/me");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use("/me", meRouter);

app.listen(process.env.PORT || 3000);
