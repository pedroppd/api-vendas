import { EntityRepository, Repository } from 'typeorm';
import { AppError } from '@errors/AppError';
import { IRequestSaveProduct } from './IRequestSaveProduct';
import { Product } from '@entities/Product';
import moment from 'moment';

@EntityRepository(Product)
export class ProductRespository extends Repository<Product> {
  async findByName(tid: string, name: string): Promise<Product | void> {
    return await this.findOne({
      where: {
        name,
      },
    }).catch(error => {
      console.log({
        tid: tid,
        message: `Error to find product ${error.stack}`,
      });
      throw new AppError(`Error to find product ${error.stack}`, 500);
    });
  }

  async findByUuid(tid: string, uuid: string): Promise<Product | void> {
    return await this.findOne({
      where: {
        uuid,
      },
    }).catch(error => {
      console.log({
        tid: tid,
        message: `Error to find product ${error.stack}`,
      });
      throw new AppError(`Error to find product ${error.stack}`, 500);
    });
  }

  async createProduct(product: IRequestSaveProduct, isUpdate?: boolean) {
    return this.create({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      nutritionalTable: JSON.parse(JSON.stringify(product.nutritionalTable)),
      createdAt: isUpdate ? undefined : moment(new Date()).format(),
      updatedAt: isUpdate ? moment(new Date()).format() : undefined,
    });
  }

  async createDeleteProduct() {
    return this.create({
      updatedAt: moment(new Date()).format(),
      deletedAt: moment(new Date()).format(),
    });
  }

  async saveProduct(tid: string, product: Product) {
    return await this.save(product).catch(error => {
      console.log({ tid: tid, message: 'Error to try save product' });
      throw new AppError('Error to try save product', 500);
    });
  }

  async updateProduct(tid: string, product: Product, prdocutUuid: string) {
    return await this.update(prdocutUuid, product).catch(error => {
      console.log({ tid: tid, message: 'Error to try update product' });
      throw new AppError('Error to try update product', 500);
    });
  }
}
