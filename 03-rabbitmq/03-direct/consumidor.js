const amqp = require("amqplib");
const args = process.argv.slice(2);

(async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const exchangeName = "exchange-direct";
  await channel.assertExchange(exchangeName, "direct", { durable: true });

  const assertQueue = await channel.assertQueue("", { exclusive: true });
  const bindingKey = args.length > 0 ? args[0] : "key";
  await channel.bindQueue(assertQueue.queue, exchangeName, bindingKey);

  channel.consume(
    assertQueue.queue,
    (msg) => console.log(msg.content.toString()),
    {
      noAck: false,
    }
  );
})();
