const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (connectionError, connection) => {
  if (connectionError) throw connectionError;

  connection.createChannel((channelError, channel) => {
    if (channelError) throw channelError;

    const queue = "livechat";

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
