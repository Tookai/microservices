import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class Comment extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  author_uuid: string;

  @Column()
  post_uuid: string;

  @Column()
  content: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;
}
