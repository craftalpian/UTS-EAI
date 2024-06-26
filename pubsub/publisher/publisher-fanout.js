const amqp = require("amqplib");
// Menggunakan package moment untuk mengatur timezone
const moment = require("moment-timezone");
// Menampilkan semua log disertai timestamp
const logTimestamp = require("log-timestamp");
// Mengatur agar timestamp menggunakan format timezone Indonesia
logTimestamp(
  () => `[${moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss.SSS")}]`
);

async function publish() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const channelName = "fanout_pian";
    let i = 1;

    await channel.assertExchange(channelName, "fanout", { durable: false });

    setInterval(() => {
      const message = `Data terkirim | pesan: ${i}`;

      channel.publish(channelName, "", Buffer.from(message));
      console.log(
        `Mengirim pesan [${message}] ke channel broadcast [${channelName}]`
      );
      i++;
    }, 1500);

    process.on("beforeExit", () => {
      channel.close();
      connection.close();
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

publish();
