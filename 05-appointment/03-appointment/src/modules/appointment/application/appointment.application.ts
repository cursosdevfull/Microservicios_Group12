import { inject, injectable } from "inversify";
import { err, ok } from "neverthrow";

import { Appointment } from "../domain/appointment";
import { AppointmentRepository } from "../domain/repositories/appointmen.repository";

enum partitionByCountry {
  PE = 0,
  CO = 1,
  MX = 2,
}

@injectable()
export class AppointmentApplication {
  constructor(
    @inject("AppoinmentRepository")
    private readonly repository: AppointmentRepository
  ) {}

  async save(appointment: Appointment) {
    const result = await this.repository.saveToDatabase(appointment);
    if (result.isErr()) {
      return err(result.error);
    }

    await this.repository.saveToKafka(
      appointment,
      partitionByCountry[appointment.country as keyof typeof partitionByCountry]
    );

    return ok(appointment);
  }
}
