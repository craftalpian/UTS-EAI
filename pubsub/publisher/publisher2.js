const amqp = require("amqplib/callback_api");
const randomstring = require("randomstring");
const readline = require("node:readline");

amqp.connect("amqp://localhost", (connectionError, connection) => {
  if (connectionError) throw connectionError;

  connection.createChannel((channelError, channel) => {
    if (channelError) throw channelError;

    const queue = "antrian pian";

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    function sendMessage() {
      rl.question(`Pesan Anda: `, (msg) => {
        console.log(`=> ${msg}!`);
        channel.sendToQueue(queue, Buffer.from(msg));

        sendMessage();
        // rl.question("Kirim pesan lagi? (ya/tidak): ", (answer) => {
        //   if (answer.toLowerCase() === "ya") {
        //   } else {
        //     rl.close();
        //     channel.close();
        //     connection.close();
        //   }
        // });
      });
    }

    sendMessage();
  });
});
