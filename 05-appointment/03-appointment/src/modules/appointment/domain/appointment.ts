export interface AppointmentEssentials {
  appointmentId: string;
  patientId: string;
  centerId: string;
  specialtyId: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentStatus: string;
  country: string;
}

export interface AppointmentOptionals {
  createdAt: Date;
  updatedAt: Date;
}

export type AppointmentProperties = AppointmentEssentials &
  Partial<AppointmentOptionals>;

export class Appointment {
  appointmentId: string;
  patientId: string;
  centerId: string;
  specialtyId: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentStatus: string;
  country: string;
  createdAt: Date;
  updatedAt: Date | undefined;

  constructor(appointment: AppointmentProperties) {
    this.appointmentId = appointment.appointmentId;
    this.patientId = appointment.patientId;
    this.centerId = appointment.centerId;
    this.specialtyId = appointment.specialtyId;
    this.appointmentDate = appointment.appointmentDate;
    this.appointmentTime = appointment.appointmentTime;
    this.appointmentStatus = appointment.appointmentStatus;
    this.country = appointment.country;

    if (appointment.createdAt) {
      this.createdAt = appointment.createdAt;
    } else {
      this.createdAt = new Date();
    }

    if (appointment.updatedAt) this.updatedAt = appointment.updatedAt;
  }

  get properties() {
    return {
      appointmentId: this.appointmentId,
      patientId: this.patientId,
      centerId: this.centerId,
      specialtyId: this.specialtyId,
      appointmentDate: this.appointmentDate,
      appointmentTime: this.appointmentTime,
      appointmentStatus: this.appointmentStatus,
      country: this.country,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  update(appointmentStatus: string) {
    this.appointmentStatus = appointmentStatus;
    this.updatedAt = new Date();
  }
}
