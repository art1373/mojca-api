import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar' })
  public name: string;

  @Column({ type: 'varchar' })
  public description: string;

  @Column({ type: 'decimal' })
  public unitPrice: number;

  @Column({ type: 'int' })
  public quantity: number;

  @Column({ type: 'varchar' })
  public currency: string;
}
