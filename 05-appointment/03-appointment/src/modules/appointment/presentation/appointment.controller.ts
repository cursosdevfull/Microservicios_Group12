import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

import { IError } from "../../core/interface/error.interface";
import { AppointmentApplication } from "../application/appointment.application";
import { Appointment, AppointmentProperties } from "../domain/appointment";
import { ValidationsService } from "./services/validations.service";

@injectable()
export class AppointmentController {
  constructor(
    @inject("AppointmentApplication")
    private readonly application: AppointmentApplication
  ) {}

  async saveAppointment(req: Request, res: Response, next: NextFunction) {
    const errors = await ValidationsService.create(req.body);

    if (errors.length > 0) {
      const objError: IError = new Error("Invalid parameters");
      objError.name = "InvalidParameters";
      objError.status = 411;
      objError.message = "Invalid parameters";
      objError.stack = JSON.stringify(errors);
      return next(objError);
    }

    const properties: AppointmentProperties = {
      appointmentId: req.body.appointmentId,
      patientId: req.body.patientId,
      centerId: req.body.centerId,
      specialtyId: req.body.specialtyId,
      appointmentDate: req.body.appointmentDate,
      appointmentTime: req.body.appointmentTime,
      appointmentStatus: req.body.appointmentStatus,
      country: req.body.country,
    };

    const appointment = new Appointment(properties);

    const result = await this.application.save(appointment);

    if (result.isErr()) {
      return next(result.error);
    }

    return res.status(201).json(result.value);
  }
}
