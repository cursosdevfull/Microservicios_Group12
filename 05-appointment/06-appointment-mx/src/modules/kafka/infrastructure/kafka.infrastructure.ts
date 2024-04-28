import { BrokerBootstrap } from "@bootstrap";
import { injectable } from "inversify";
import { EachMessagePayload } from "kafkajs";

import { KafkaRepository } from "../domain/repositories/kafka.repository";

@injectable()
export class KafkaInfrastructure implements KafkaRepository {
  async subscribeConsumerToTopics(...topics: string[]) {
    const consumer = BrokerBootstrap.getConsumer();
    await consumer.connect();
    await consumer.subscribe({ topics, fromBeginning: true });
  }

  async runConsumer(cb: (payload: EachMessagePayload) => Promise<void>) {
    const consumer = BrokerBootstrap.getConsumer();
    await consumer.run({
      eachMessage: cb,
    });
  }

  async sentMessage(
    topic: string,
    key: string,
    message: Record<string, string | number | boolean | object>,
    partition: number = 0
  ) {
    const producer = BrokerBootstrap.getProducer();
    await producer.send({
      topic,
      messages: [
        {
          partition,
          key,
          value: JSON.stringify(message),
        },
      ],
    });
  }
}
