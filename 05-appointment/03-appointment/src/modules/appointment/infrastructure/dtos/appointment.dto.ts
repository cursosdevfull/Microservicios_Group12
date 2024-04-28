import { Appointment, AppointmentProperties } from "../../domain/appointment";
import { AppointmentEntity } from "../entities/appointment.entity";

export class AppointmentDto {
  static fromDomainToData(appointment: Appointment): AppointmentEntity {
    const appointmentEntity = new AppointmentEntity();
    appointmentEntity.appointmentId = appointment.properties.appointmentId;
    appointmentEntity.patientId = appointment.properties.patientId;
    appointmentEntity.centerId = appointment.properties.centerId;
    appointmentEntity.specialtyId = appointment.properties.specialtyId;
    appointmentEntity.appointmentDate = appointment.properties.appointmentDate;
    appointmentEntity.appointmentTime = appointment.properties.appointmentTime;
    appointmentEntity.appointmentStatus =
      appointment.properties.appointmentStatus;
    appointmentEntity.country = appointment.properties.country;
    appointmentEntity.createdAt = appointment.properties.createdAt;
    appointmentEntity.updatedAt = appointment.properties.updatedAt;

    return appointmentEntity;
  }

  static fromDataToDomain(appointmentEntity: AppointmentEntity): Appointment {
    const props: AppointmentProperties = {
      appointmentId: appointmentEntity.appointmentId,
      patientId: appointmentEntity.patientId,
      centerId: appointmentEntity.centerId,
      specialtyId: appointmentEntity.specialtyId,
      appointmentDate: appointmentEntity.appointmentDate,
      appointmentTime: appointmentEntity.appointmentTime,
      appointmentStatus: appointmentEntity.appointmentStatus,
      country: appointmentEntity.country,
      createdAt: appointmentEntity.createdAt,
      updatedAt: appointmentEntity.updatedAt,
    };
    const appointment = new Appointment(props);

    return appointment;
  }
}
