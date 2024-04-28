import { BrokerBootstrap } from "@bootstrap";
import { Parameters } from "@core";
import { inject, injectable } from "inversify";

import { KafkaRepository } from "../domain/repositories/kafka.repository";

@injectable()
export class KafkaApplication {
  constructor(
    @inject("KafkaRepository") private readonly repository: KafkaRepository
  ) {}

  async run() {
    console.log("topic", Parameters.kafkaTopic);
    await this.repository.subscribeConsumerToTopics(Parameters.kafkaTopic);
    await this.repository.runConsumer(async ({ message, partition, topic }) => {
      console.log("Message received: ", message.value.toString());
      console.log("Partition: ", partition.toString());

      const appointment = JSON.parse(message.value.toString());

      const consumer = BrokerBootstrap.getConsumer();

      await consumer.commitOffsets([
        { topic, partition, offset: message.offset + 1 },
      ]);

      await this.repository.sentMessage(
        Parameters.kafkaTopicAppointment,
        "appointment",
        { appointmentId: appointment.appointmentId, status: "COMPLETED" },
        0
      );

      /* if (partition === 0) {
        console.log("Commiting offset", message.offset);
        await consumer.commitOffsets([
          { topic, partition, offset: message.offset + 1 },
        ]);
      } else {
        await consumer.commitOffsets([
          { topic, partition, offset: (Number(message.offset) - 1).toString() },
        ]);
        //consumer.seek({ topic, partition, offset: message.offset });
      } */
    });
  }
}
