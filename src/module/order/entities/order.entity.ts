import { Product } from "src/module/product/entities/product.entity"
import { User } from "src/module/user/entities/user.entity"
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.orderId)
    userId: User

    @ManyToMany(() => Product)
    @JoinTable()
    productId: Product[]
}
