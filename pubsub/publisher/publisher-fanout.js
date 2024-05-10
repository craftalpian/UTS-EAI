const amqp = require("amqplib");

async function publish() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    let i = 0;
    const channelName = "fanout_channel";

    await channel.assertExchange(channelName, "fanout", { durable: false });

    setInterval(() => {
      i = i + 1;
      const message = `Data terkirim | pesan: ${i}`;

      channel.publish(channelName, '', Buffer.from(message));
      console.log(
        `Message [${message}] sent to channel [${channelName}] ${new Date().toISOString()}`
      );
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
