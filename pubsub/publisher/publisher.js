const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const amqp = require("amqplib/callback_api");
const randomstring = require("randomstring");

amqp.connect("amqp://localhost", (connectionError, connection) => {
  if (connectionError) throw connectionError;

  connection.createChannel((channelError, channel) => {
    if (channelError) throw channelError;

    const queue = "antrian pian";
    const message = `Data terkirim | pesan: ${randomstring.generate()}`;

    channel.assertQueue(queue, { durable: false });

    setInterval(() => {
      channel.sendToQueue(queue, Buffer.from(message));
      console.log(
        `Message [${message}] sent to queue [${queue}] ${new Date().toISOString()}`
      );
    }, 1500);

    process.on("beforeExit", () => {
      channel.close();
      connection.close();
    });
  });
});

app.listen(port, () => {
  console.log(`Publisher listening at http://172.18.0.9:${port}`);
});
