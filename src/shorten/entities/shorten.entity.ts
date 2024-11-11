import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ShortenEntity {
  @PrimaryGeneratedColumn('rowid')
  id: string;

  @Column()
  url: string;

  @Column()
  @Generated('uuid')
  shortCode: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
