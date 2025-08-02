const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from backend!");
});

const auth = require("./routes/auth");
app.use("/api/auth", auth);

const subject = require("./routes/subject");
app.use("/api/subject", subject);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
