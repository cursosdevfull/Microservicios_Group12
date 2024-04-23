import { DatabaseBootstrap } from "@bootstrap";
import { Parameters } from "@core";
import { inject, injectable } from "inversify";
import { err, ok, Result } from "neverthrow";
import { KafkaRepository } from "src/modules/kafka/domain/repositories/kafka.repository";

import { IError } from "../../core/interface/error.interface";
import { Appointment } from "../domain/appointment";
import { AppointmentRepository } from "../domain/repositories/appointmen.repository";
import { AppointmentDto } from "./dtos/appointment.dto";
import { AppointmentEntity } from "./entities/appointment.entity";

export type AppointmentSaveResult = Result<Appointment, Error>;

@injectable()
export class AppointmentInfrastructure implements AppointmentRepository {
  constructor(
    @inject("KafkaRepository") private readonly kafka: KafkaRepository
  ) {}

  async saveToDatabase(
    appointment: Appointment
  ): Promise<AppointmentSaveResult> {
    try {
      const repository =
        DatabaseBootstrap.dataSource.getRepository(AppointmentEntity);
      const appointmentEntity = AppointmentDto.fromDomainToData(appointment);

      await repository.save(appointmentEntity);
      return ok(appointment);
    } catch (error: any) {
      const objError: IError = new Error(
        "Error saving appointment to database"
      );
      objError.status = 500;
      objError.message = error.message;

      return err(objError);
    }
  }
  saveToKafka(
    appointment: Appointment,
    numPartition: number = 0
  ): Promise<void> {
    this.kafka.sentMessage(
      Parameters.kafkaTopic,
      "appointment",
      appointment.properties,
      numPartition
    );
    return Promise.resolve();
  }
  listenToKafka(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
