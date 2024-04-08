const { kafka } = require("./client");
const readline = require("readline");

const { Partitioners } = require("kafkajs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async () => {
  const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
  });

  console.log("Connecting producer");
  await producer.connect();
  console.log("Producer connected successfully");

  rl.setPrompt("> ");
  rl.prompt();

  rl.on("line", async (line) => {
    const [message, partition] = line.split(" ");
    await producer.send({
      topic: "updates-client",
      messages: [
        {
          partition: +partition,
          key: "testing update",
          value: JSON.stringify({ message, numPartition: partition }),
        },
      ],
    });
  }).on("close", async () => {
    await producer.disconnect();
  });
})();
