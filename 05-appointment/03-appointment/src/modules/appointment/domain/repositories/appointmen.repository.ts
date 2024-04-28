import { EachMessagePayload } from "kafkajs";

import {
  AppointmentFindByIdResult,
  AppointmentSaveResult,
} from "../../infrastructure/appointment.infrastructure";
import { Appointment } from "../appointment";

export interface AppointmentRepository {
  saveToDatabase(appointment: Appointment): Promise<AppointmentSaveResult>;
  saveToKafka(appointment: Appointment, topic: string): Promise<void>;
  listenToKafka(
    topics: string[],
    cb: (payload: EachMessagePayload) => Promise<void>
  ): Promise<void>;
  findById(appointmentId: string): Promise<AppointmentFindByIdResult>;
}
