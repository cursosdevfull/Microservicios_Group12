import { Parameters } from "@core";
import { Consumer, Kafka, Partitioners, Producer } from "kafkajs";

export class BrokerBootstrap {
  private static client: Kafka;
  private static consumer: Consumer;
  private static producer: Producer;

  constructor() {}

  async initialize(): Promise<void> {
    BrokerBootstrap.client = new Kafka({
      clientId: Parameters.kafkaConfig.clientId,
      brokers: Parameters.kafkaConfig.brokers,
    });

    const admin = BrokerBootstrap.client.admin();
    await admin.createTopics({
      topics: [
        {
          topic: Parameters.kafkaTopicPE,
          numPartitions: 1,
        },
        {
          topic: Parameters.kafkaTopicCO,
          numPartitions: 1,
        },
        {
          topic: Parameters.kafkaTopicMX,
          numPartitions: 1,
        },
        {
          topic: Parameters.kafkaTopicAppointment,
          numPartitions: 1,
        },
        {
          topic: Parameters.kafkaTopicRollout,
          numPartitions: 1,
        },
      ],
    });
    BrokerBootstrap.consumer = BrokerBootstrap.client.consumer({
      groupId: Parameters.kafkaGroupId,
    });

    BrokerBootstrap.producer = BrokerBootstrap.client.producer({
      createPartitioner: Partitioners.LegacyPartitioner,
    });

    await BrokerBootstrap.producer.connect();
    /*     const kafkaService = new KafkaInfrastructure();
    kafkaService.sentMessage(Parameters.kafkaTopic, "key", {
      message: "Hello World",
    }); */
    return Promise.resolve();

    //await BrokerBootstrap.consumer.connect();
  }

  /*   const client = new Kafka(Parameters.kafkaConfig);

  const consumer = client.consumer({ groupId: Parameters.kafkaGroupId });
  const producer = client.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
  });

  BrokerBootstrap.client = client;
  BrokerBootstrap.consumer = consumer;
  BrokerBootstrap.producer = producer; */

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
