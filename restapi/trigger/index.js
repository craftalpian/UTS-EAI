// Menggunakan dotenv untuk mengampil variabel environment
require("dotenv").config();
// Menampilkan semua log disertai timestamp
require("log-timestamp");
// Menggunakan framework ExpressJs
const express = require("express");
// Menggunakan Axios untuk mengirim data ke backend
const { default: axios } = require("axios");
// Menggunakan randomstring untuk membuat id secara acak
const randomstring = require("randomstring");

// Melakukan inisiasi aplikasi ExpressJs
const app = express();
// Membuat variabel port dari environment
const port = process.env.PORT;

// Membuat endpoint terhadap /trigger
app.get("/trigger", async (_, res) => {
  // Mengatur awal waktu proses looping data dengan nama Loop
  console.time("Loop");

  // Melakukan iterasi sebanyak 10 kali ke beberapa service penerima
  for (let i = 0; i < 10; i++) {
    // Membuat id random yang akan dikirim
    const id = randomstring.generate();

    /**
     * Pada percobaan pertama, saya menguji untuk mengirim data ke endpoint /book
     * dan endpoint tersebut akan menampilkan kembali. Dengan tujuan untuk memahami
     * seberapa lama waktu yang dibutuhkan untuk mengirimkan data berulang.
     */

    // Mengatur kapan waktu untuk memulai
    console.time("LoopPost");

    // Mengirimkan data berupa post dalam JSON dengan variabel id yang dikirim
    const { data: postData } = await axios.post("http://localhost:2000/book", {
      id,
    });

    // Memberhentikan proses perhitungan waktu yang dibutuhkan
    console.timeEnd(
      "LoopPost",
      `id yang dikirim: ${id} | id yang diterima: ${postData?.id}`
    );

    /**
     * Pada percobaan kedua, saya menguji untuk mengambil data dari endpoint
     * /gadget. Hal ini akan mengetahui perbandingan dari melakukan pengiriman data
     * pada uji pertama dengan pengambilan data pada uji kedua.
     */

    // Mengatur waktu mulai untuk mendapatkan data
    console.time("LoopGet");

    // Mengambil data dari endpoint /gadget
    const { data: getData } = await axios.get("http://localhost:2000/gadget");

    // Memberhentikan perulangan
    console.timeEnd("LoopGet", `berhasil mengambil id: ${getData?.id}`);
  }

  // Menyelesaikan waktu dalam proses iterasi sebanyak n-kali mengirimkan data secara bersamaan
  console.timeEnd("Loop");

  // Menampilkan response json
  res.json({
    status: true,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
