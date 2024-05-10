const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.get("/trigger", (_, res) => {
  console.time("Loop");

  for (let i = 0; i < 1000000; i++) {
    if (i === 500000) {
      console.timeLog("Loop", "Reached halfway");
    }
  }

  console.timeEnd("Loop");

  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
