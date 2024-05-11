const amqp = require("amqplib");
// Menggunakan package moment untuk mengatur timezone
const moment = require("moment-timezone");
// Menampilkan semua log disertai timestamp
const logTimestamp = require("log-timestamp");
// Mengatur agar timestamp menggunakan format timezone Indonesia
logTimestamp(
  () => `[${moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss.SSS")}]`
);

async function subscribe() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const exchangeName = "fanout_pian";

    await channel.assertExchange(exchangeName, "fanout", { durable: false });

    const { queue } = await channel.assertQueue("", { exclusive: true });

    // Binding queue dengan exchange
    await channel.bindQueue(queue, exchangeName, "");

    await channel.consume(
      queue,
      (message) => {
        console.log(`Menerima pesan: [${message.content.toString()}]`);
      },
      { noAck: true }
    );
  } catch (error) {
    console.error("Error:", error);
  }
}

subscribe();
