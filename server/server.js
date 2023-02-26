const express = require("express");
require("dotenv").config();
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// ROUTES //
app.use("/auth", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/user", require("./routes/user"));
app.use("/lapor", require("./routes/lapor"));
app.use("/layanan", require("./routes/layanan"));

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
