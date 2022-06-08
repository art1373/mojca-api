import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../products/products.entity';
import { User } from '../user/user.entity';
import { Status } from './order.types';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ type: 'jsonb' })
  public orderItems: Product[];

  @Column({ type: 'decimal' })
  public totalPrice: number;

  @Column({ type: 'enum', enum: Status, default: Status.SUBMIT })
  public status!: Status;

  @Column({ type: 'uuid', nullable: true })
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;
}
