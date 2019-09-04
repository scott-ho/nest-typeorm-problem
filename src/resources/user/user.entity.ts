import { IsEmail } from 'class-validator';
import { AfterLoad, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mc_users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column({ length: 100, unique: true })
  open_id: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ type: 'tinyint', nullable: true })
  status: number;

  @Column({ type: 'int' })
  created_at: string;

  @Column({ type: 'int' })
  updated_at: string;
}
