const express = require("express");
require("dotenv").config();
const { default: axios } = require("axios");
const app = express();
const port = process.env.PORT;
const randomstring = require("randomstring");

app.use(express.json());
app.get("/trigger", async (_, res) => {
  console.time("Loop");
  const id = randomstring.generate();

  for (let i = 0; i < 10; i++) {
    const { data: postData } = await axios.post("http://localhost:2000/book", {
      id,
    });

    console.timeLog("Loop", { postData });

    const { data: getData } = await axios.get("http://localhost:2000/gadget");

    console.timeLog("Loop", getData?.id);
  }
  console.timeEnd("Loop");

  res.json({
    status: true,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
