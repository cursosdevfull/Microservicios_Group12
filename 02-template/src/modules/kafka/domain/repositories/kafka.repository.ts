import { EachMessagePayload } from "kafkajs";

export interface KafkaRepository {
  subscribeConsumerToTopics(...topics: string[]): void;
  runConsumer(cb: (payload: EachMessagePayload) => Promise<void>): void;
  sentMessage(
    topic: string,
    key: string,
    message: Record<string, string | number | boolean | object>,
    partition: number
  ): void;
}
