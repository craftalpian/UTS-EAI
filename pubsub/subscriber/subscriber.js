const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (connectionError, connection) => {
  if (connectionError) throw connectionError;

  connection.createChannel((channelError, channel) => {
    if (channelError) throw channelError;

    const queue = "antrian pian";

    channel.assertQueue(queue, { durable: false });
    channel.consume(
      queue,
      (message) => {
        console.log(
          `Message [${message.content.toString()}] received froms queue [${queue}]`
        );
      },
      { noAck: true }
    );
  });
});

app.listen(port, () => {
  console.log(`Subscriber listening at http://172.18.0.10:${port}`);
});
