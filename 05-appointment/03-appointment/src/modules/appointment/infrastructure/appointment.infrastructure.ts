import { DatabaseBootstrap } from "@bootstrap";
import { inject, injectable } from "inversify";
import { EachMessagePayload } from "kafkajs";
import { err, ok, Result } from "neverthrow";

import { IError } from "../../core/interface/error.interface";
import { KafkaRepository } from "../../kafka/domain/repositories/kafka.repository";
import { Appointment } from "../domain/appointment";
import { AppointmentRepository } from "../domain/repositories/appointmen.repository";
import { AppointmentDto } from "./dtos/appointment.dto";
import { AppointmentEntity } from "./entities/appointment.entity";

export type AppointmentSaveResult = Result<Appointment, Error>;
export type AppointmentFindByIdResult = Result<Appointment | null, Error>;

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

  saveToKafka(appointment: Appointment, topic: string): Promise<void> {
    this.kafka.sentMessage(topic, "appointment", appointment.properties, 0);
    return Promise.resolve();
  }

  async listenToKafka(
    topics: string[],
    cb: (payload: EachMessagePayload) => Promise<void>
  ): Promise<void> {
    await this.kafka.subscribeConsumerToTopics(...topics);
    await this.kafka.runConsumer(cb);
  }

  async findById(appointmentId: string): Promise<AppointmentFindByIdResult> {
    try {
      const repository =
        DatabaseBootstrap.dataSource.getRepository(AppointmentEntity);

      const appointmentEntity = await repository.findOne({
        where: { appointmentId },
      });

      if (!appointmentEntity) return ok(null);

      const appointment = AppointmentDto.fromDataToDomain(appointmentEntity);
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
}
