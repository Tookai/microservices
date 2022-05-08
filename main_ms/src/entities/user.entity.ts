import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column('boolean', { default: false })
  isAdmin = false;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;
}
