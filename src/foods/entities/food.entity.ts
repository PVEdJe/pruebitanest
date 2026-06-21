import { Category } from "src/categories/entities/category.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Food {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    name!: string;
    @Column()
    price!: number;
    @Column()
    description!: string;
    @Column()
    img!: string;
    @ManyToOne (() => Category, (category) =>
    category.foods, {nullable : true})
    category! : Category
    @Column({ default: true })
    isAvailable!: boolean;
}
