const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const randomstring = require("randomstring");

app.use(express.json());

app.post("/book", (req, res) => {
  const { id } = req?.body;

  console.timeLog("Received Book Data: ", `[${id}]`);

  res.json({
    type: "book",
    id: `book-${id}`,
  });
});

app.get("/gadget", (_, res) => {
  const id = randomstring.generate();
  console.time("Data")
  console.timeLog("Data", `[${id}]`);
  console.timeEnd("Data")

  res.json({
    type: "gadget",
    id: `gadget-${id}`,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
