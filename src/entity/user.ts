import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({type: 'character varying', unique: true})
  username!: string;
  @Column({type: 'character varying'})
  password!: string;
  @Column({type: 'boolean'})
  enabled!: boolean;
}
