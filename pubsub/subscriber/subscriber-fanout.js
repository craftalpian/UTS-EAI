const amqp = require("amqplib");

async function subscribe() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const exchangeName = "fanout_channel";

    await channel.assertExchange(exchangeName, "fanout", { durable: false });

    const { queue } = await channel.assertQueue("", { exclusive: true });

    // Binding queue dengan exchange
    await channel.bindQueue(queue, exchangeName, "");

    console.log(
      `Waiting for messages in queue [${queue}]. To exit press CTRL+C`
    );

    await channel.consume(
      queue,
      (message) => {
        console.log(
          `Message [${message.content.toString()}] received from queue [${queue}]`
        );
      },
      { noAck: true }
    );
  } catch (error) {
    console.error("Error:", error);
  }
}

subscribe();
