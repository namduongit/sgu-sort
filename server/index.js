const express = require("express");
const cors = require("cors");

require("dotenv").config({
  path: "../.env"
});

const app = express();
const PORT = process.env.PORT_BE;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    message: "Hello form BE",
    port: "Run in port: "+ process.env.PORT_BE
  });
});

const auth = require("./routes/auth");
app.use("/api/auth", auth);

const subject = require("./routes/subject");
app.use("/api/subject", subject);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
