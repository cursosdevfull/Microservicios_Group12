import { Appointment } from "../../domain/appointment";
import { AppointmentEntity } from "../entities/appointment.entity";

export class AppointmentDto {
  static fromDomainToData(appointment: Appointment): AppointmentEntity {
    const appointmentEntity = new AppointmentEntity();
    appointmentEntity.appointmentId = appointment.appointmentId;
    appointmentEntity.patientId = appointment.patientId;
    appointmentEntity.centerId = appointment.centerId;
    appointmentEntity.specialtyId = appointment.specialtyId;
    appointmentEntity.appointmentDate = appointment.appointmentDate;
    appointmentEntity.appointmentTime = appointment.appointmentTime;
    appointmentEntity.appointmentStatus = appointment.appointmentStatus;
    appointmentEntity.country = appointment.country;
    appointmentEntity.createdAt = appointment.createdAt;
    appointmentEntity.updatedAt = appointment.updatedAt;

    return appointmentEntity;
  }
}
