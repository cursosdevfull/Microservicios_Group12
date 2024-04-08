const { kafka } = require("./client");

(async () => {
  const admin = kafka.admin();
  console.log("Admin is connecting...");
  admin.connect();
  console.log("Admin connection is successful");

  console.log("Creating topic [updates-client]");
  await admin.createTopics({
    topics: [
      {
        topic: "updates-client",
        numPartitions: 2,
      },
    ],
  });
  console.log("Topic created sucess");
  console.log("Disconnection admin");
  await admin.disconnect();
})();
