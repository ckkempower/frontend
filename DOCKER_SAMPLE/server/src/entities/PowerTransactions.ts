import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PowerTransactionType } from "../shared/types";

@Entity()
export class PowerTransaction
  extends BaseEntity
  implements PowerTransactionType
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  videoId: string;

  @Column()
  powerTranferred: number;

  @Column()
  userId: number;

  @Column()
  type: string;

  @CreateDateColumn()
  createdAt: Date;
}
