// Menggunakan dotenv untuk mengampil variabel environment
require("dotenv").config();
// Menggunakan package moment untuk mengatur timezone
const moment = require("moment-timezone");
// Menampilkan semua log disertai timestamp
const logTimestamp = require("log-timestamp");
// Mengatur agar timestamp menggunakan format timezone Indonesia
logTimestamp(
  () => `[${moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss.SSS")}]`
);
// Menggunakan framework ExpressJs
const express = require("express");
// Menggunakan randomstring untuk membuat id secara acak
const randomstring = require("randomstring");

// Melakukan inisiasi aplikasi ExpressJs
const app = express();
// Membuat variabel port dari environment
const port = process.env.PORT;

// Aplikasi Express dapat menerima tipe data JSON
app.use(express.json());

// Endpoint /book yang akan menerima data dalam bentuk POST
app.post("/book", (req, res) => {
  // Mengatur awal waktu proses menerima data sampai mengembalikan data
  console.time("Received Post");

  // Mengambil id yang dikirimkan dari trigger
  const { id } = req?.body;

  // Mengembalikan data berupa JSON dengan id yang dikirimkan oleh trigger
  res.json({
    type: "book",
    id: `book-${id}`,
  });

  console.log(`data diterima dari trigger: ${id}`)

  // Mengatur proses berhenti mencatat waktu untuk label Received Post
  console.timeEnd("Received Post");
});

// Endpoint /gadget untuk menerima data yang diambil dalam HTTP GET
app.get("/gadget", (_, res) => {
  // Mengatur awal waktu proses menerima request sampai mengembalikan data
  console.time("Received Get");

  // Membuat id random dari package randomstring
  const id = randomstring.generate();

  // Mengembalikan response
  res.json({
    type: "gadget",
    id: `gadget-${id}`,
  });

  console.log(`data yang dikembalikan dengan id: ${id}`)

  // Mengatur proses berhenti mencatat waktu untuk label Received Get
  console.timeEnd("Received Get");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
