import {EntityRepository, Repository} from "typeorm";
import {Products} from "@modules/typeorm/entities/Products";

@EntityRepository(Products)
export class ProductRespository extends Repository<Products>{

    public async findByName(name: string): Promise<Products | void>{
        return await this.findOne({
            where: {
                 name
            }
        }).catch((error) => {
            console.log(`Error to find product ${error.stack}`);
        });
    }
}