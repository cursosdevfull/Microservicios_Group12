import { AppointmentSaveResult } from "../../infrastructure/appointment.infrastructure";
import { Appointment } from "../appointment";

export interface AppointmentRepository {
  saveToDatabase(appointment: Appointment): Promise<AppointmentSaveResult>;
  saveToKafka(appointment: Appointment, numPartition: number): Promise<void>;
  listenToKafka(): Promise<void>;
}
