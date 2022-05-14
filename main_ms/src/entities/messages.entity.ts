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
export class Message extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  content: string;

  @Column()
  author: string;

  @Column()
  authorId: string;

  @Column()
  conversationId: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;
}
