import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "appointment" })
export class AppointmentEntity {
  @PrimaryColumn()
  appointmentId: string;

  @Column({ type: "varchar", length: 100 })
  patientId: string;

  @Column({ type: "varchar", length: 100 })
  centerId: string;

  @Column({ type: "varchar", length: 100 })
  specialtyId: string;

  @Column({ type: "varchar", length: 100 })
  appointmentDate: string;

  @Column({ type: "varchar", length: 100 })
  appointmentTime: string;

  @Column({ type: "varchar", length: 100 })
  appointmentStatus: string;

  @Column({ type: "varchar", length: 2 })
  country: string;

  @Column({ type: "timestamp" })
  createdAt: Date;

  @Column({ type: "timestamp", nullable: true })
  updatedAt: Date | undefined;
}
