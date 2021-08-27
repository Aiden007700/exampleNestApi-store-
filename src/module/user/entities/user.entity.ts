import { Order } from "src/module/order/entities/order.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(() => Order, order => order.userId)
    orderId: Order[]
}
