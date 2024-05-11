const amqp = require("amqplib");
// Menggunakan package moment untuk mengatur timezone
const moment = require("moment-timezone");
// Menampilkan semua log disertai timestamp
const logTimestamp = require("log-timestamp");
// Mengatur agar timestamp menggunakan format timezone Indonesia
logTimestamp(
  () => `[${moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss.SSS")}]`
);
const readline = require("node:readline");

(async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channelPub = await connection.createChannel();
    const channelSub = await connection.createChannel();

    const queueKeyPub = "livechat_pian_pub";
    const queueKeySub = "livechat_pian_sub";

    await channelPub.assertQueue(queueKeyPub, { durable: false });
    await channelSub.assertQueue(queueKeySub, { durable: false });

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    channelPub.consume(
      queueKeyPub,
      (msg) => {
        console.log(`\nPesan Diterima <= ${msg.content.toString()}`);
      },
      { noAck: true }
    );

    function sendMessage() {
      rl.question(`\nPesan Anda: `, (msg) => {
        channelSub.sendToQueue(queueKeySub, Buffer.from(msg));
        console.log(`\nPesan Terkirim => ${msg}`);

        sendMessage();
      });
    }

    sendMessage();

    process.on("beforeExit", () => {
      channelPub.close();
      channelSub.close();
      connection.close();
    });
  } catch (error) {
    console.error("Error:", error);
  }
})();
