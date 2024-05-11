const amqp = require("amqplib");
// Menggunakan package moment untuk mengatur timezone
const moment = require("moment-timezone");
// Menampilkan semua log disertai timestamp
const logTimestamp = require("log-timestamp");
// Mengatur agar timestamp menggunakan format timezone Indonesia
logTimestamp(
  () => `[${moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss.SSS")}]`
);

(async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const queueKey = "direct_pian";

    await channel.assertQueue(queueKey, { durable: false });

    let i = 1;

    setInterval(async () => {
      console.time("sendQueue");
      const message = `Urutan: ${i}`;

      await channel.sendToQueue(queueKey, Buffer.from(message));

      console.log(`Berhasil mengirimkan ${message} ke ${queueKey}`);
      console.timeEnd("sendQueue");

      i++;
    }, 1500);

    process.on("beforeExit", () => {
      channel.close();
      connection.close();
    });
  } catch (error) {
    console.error("Error:", error);
  }
})();
