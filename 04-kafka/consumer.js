const { kafka } = require("./client");
const group = process.argv[2];

(async () => {
  const consumer = kafka.consumer({ groupId: group });
  await consumer.connect();

  await consumer.subscribe({ topics: ["updates-client"], fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(
        `${group}: [${topic}]: PARTITION: ${partition}`,
        message.value.toString()
      );
    },
  });
})();
