import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn} from "typeorm";
import {v4 as uuid} from "uuid";

@Entity('products')
export class Products{

    constructor() {
        if(!this.id){
            this.id = uuid();
        }
    }

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string

    @Column('decimal')
    price: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}