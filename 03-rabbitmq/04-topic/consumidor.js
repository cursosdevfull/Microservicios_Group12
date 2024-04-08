const amqp = require("amqplib");
const args = process.argv.slice(2);

(async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const exchangeName = "exchange-topic";
  await channel.assertExchange(exchangeName, "topic", { durable: true });

  const assertQueue = await channel.assertQueue("", { exclusive: true });
  const bindingsKey = args.length > 0 ? args : ["key"];

  const listBindings = [];

  for (const bindingKey of bindingsKey) {
    listBindings.push(
      channel.bindQueue(assertQueue.queue, exchangeName, bindingKey)
    );
  }

  await Promise.all(listBindings);

  channel.consume(
    assertQueue.queue,
    (msg) => console.log(msg.content.toString()),
    {
      noAck: false,
    }
  );
})();
