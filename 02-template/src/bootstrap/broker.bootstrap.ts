import { Consumer, Kafka, Partitioners, Producer } from "kafkajs";

export class BrokerBootstrap {
  private static client: Kafka;
  private static consumer: Consumer;
  private static producer: Producer;

  constructor() {
    const client = new Kafka({
      clientId: "my-client-kafka",
      brokers: ["localhost:9092"],
    });

    const consumer = client.consumer({ groupId: "test-group" });
    const producer = client.producer({
      createPartitioner: Partitioners.LegacyPartitioner,
    });

    BrokerBootstrap.client = client;
    BrokerBootstrap.consumer = consumer;
    BrokerBootstrap.producer = producer;
  }

  static getClient(): Kafka {
    return BrokerBootstrap.client;
  }

  static getConsumer(): Consumer {
    return BrokerBootstrap.consumer;
  }

  static getProducer(): Producer {
    return BrokerBootstrap.producer;
  }
}
