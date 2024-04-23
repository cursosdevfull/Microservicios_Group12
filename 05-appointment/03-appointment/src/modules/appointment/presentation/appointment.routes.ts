import { Router } from "express";
import { KafkaRepository } from "src/modules/kafka/domain/repositories/kafka.repository";
import { KafkaInfrastructure } from "src/modules/kafka/infrastructure/kafka.infrastructure";

import { AppointmentApplication } from "../application/appointment.application";
import { AppointmentInfrastructure } from "../infrastructure/appointment.infrastructure";
import { AppointmentController } from "./appointment.controller";

class AppointmentRoutes {
  readonly router: Router;

  constructor(private readonly controller: AppointmentController) {
    this.router = Router(); //express.Router();

    this.mountRoutes();
  }

  private mountRoutes() {
    this.router.post(
      "/",
      this.controller.saveAppointment.bind(this.controller)
    );
  }
}

const kafka: KafkaRepository = new KafkaInfrastructure();
const repository = new AppointmentInfrastructure(kafka);
const application = new AppointmentApplication(repository);
const controller = new AppointmentController(application);

export const appointmentRouter = new AppointmentRoutes(controller).router;
