import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

enum EnumTaskPriority {
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
}

@Entity("tasks")
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  description: string;

  @Column({
    type: "enum",
    enum: EnumTaskPriority,
    nullable: false,
  })
  priority: EnumTaskPriority;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export type TCreateTask = Omit<TaskEntity, "id" | "createdAt" | "updatedAt">;
