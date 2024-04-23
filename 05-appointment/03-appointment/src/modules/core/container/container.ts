import { Container } from "inversify";

import { AppointmentApplication } from "../../appointment/application/appointment.application";
import { AppointmentRepository } from "../../appointment/domain/repositories/appointmen.repository";
import { AppointmentInfrastructure } from "../../appointment/infrastructure/appointment.infrastructure";
import { AppointmentController } from "../../appointment/presentation/appointment.controller";
import { KafkaRepository } from "../../kafka/domain/repositories/kafka.repository";
import { KafkaInfrastructure } from "../../kafka/infrastructure/kafka.infrastructure";

const container = new Container();
container
  .bind<AppointmentRepository>("AppointmentRepository")
  .to(AppointmentInfrastructure);
container
  .bind<AppointmentApplication>("AppointmentApplication")
  .to(AppointmentApplication);
container
  .bind<AppointmentController>("AppointmentController")
  .to(AppointmentController);

container.bind<KafkaRepository>("KafkaRepository").to(KafkaInfrastructure);

//console.log("container initialize", container);

export { container };
