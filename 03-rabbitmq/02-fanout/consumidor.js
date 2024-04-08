const amqp = require("amqplib");

(async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const exchangeName = "exchange-fanout";
  await channel.assertExchange(exchangeName, "fanout", { durable: true });

  const assertQueue = await channel.assertQueue("", { exclusive: true });
  await channel.bindQueue(assertQueue.queue, exchangeName, "");

  channel.consume(
    assertQueue.queue,
    (msg) => console.log(msg.content.toString()),
    {
      noAck: false,
    }
  );
})();
