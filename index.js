require("dotenv").config({ path: "./.env" });
const connectToMongodb = require("./db");
var cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const port = process.env.PORT;
connectToMongodb();
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/file", require("./routes/file"));
app.get("/", (req, res) => {
  res.send("JHDF JKSGHKDF");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
