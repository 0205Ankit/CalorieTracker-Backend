import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity('category')
export default class Category extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  maxFoodItems: number;

  @CreateDateColumn()
  createdAt: Date;
    static maxFoodItems: number;
}
