const { Kafka } = require("kafkajs");

exports.kafka = new Kafka({
  clientId: "my-client-kafka",
  brokers: ["localhost:9092"],
});
