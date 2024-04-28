import { Parameters } from "@core";
import { inject, injectable } from "inversify";
import { err, ok } from "neverthrow";

import { Appointment } from "../domain/appointment";
import { AppointmentRepository } from "../domain/repositories/appointmen.repository";

@injectable()
export class AppointmentApplication {
  constructor(
    @inject("AppointmentRepository")
    private readonly repository: AppointmentRepository
  ) {}

  async save(appointment: Appointment) {
    const result = await this.repository.saveToDatabase(appointment);
    if (result.isErr()) {
      return err(result.error);
    }

    const topics: { [k: string]: string } = {
      PE: Parameters.kafkaTopicPE,
      CO: Parameters.kafkaTopicCO,
      MX: Parameters.kafkaTopicMX,
    };

    await this.repository.saveToKafka(
      appointment,
      topics[appointment.properties.country]
    );

    return ok(appointment);
  }

  async listenMessage() {
    console.log("topics", [
      Parameters.kafkaTopicAppointment,
      Parameters.kafkaTopicRollout,
    ]);
    await this.repository.listenToKafka(
      [Parameters.kafkaTopicAppointment, Parameters.kafkaTopicRollout],
      async ({ message, partition, topic }) => {
        console.log("Message received: ", message.value.toString());
        console.log("Partition: ", partition.toString());
        console.log("Topic: ", topic);

        const body = JSON.parse(message.value.toString());
        const { appointmentId, status } = body;

        const result = await this.repository.findById(appointmentId);

        if (result.isErr()) {
          console.error(result.error);
          return;
        }

        const appointment = result.value;

        if (appointment) {
          appointment.update(status);
          const result = await this.repository.saveToDatabase(appointment);
          if (result.isErr()) {
            console.log(result.error);
          }
        }
      }
    );
  }
}
