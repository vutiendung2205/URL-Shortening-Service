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

  @Column({ type: 'int', default: 0 })
  accessCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
