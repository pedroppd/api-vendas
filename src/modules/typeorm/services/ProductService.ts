import { AppError } from '@shared/errors/AppError';
import { IRequestSaveProduct } from '@modules/interfaces/IRequestSaveProduct';
import { Products } from '@modules/typeorm/entities/Products';
import { getConnectionOptions, getCustomRepository } from 'typeorm';
import { ProductRespository } from '@modules/typeorm/repositories/ProductRespository';

export class ProductService {
  constructor() {}
  async findByName(tid: string, name: string): Promise<any> {
    const repository = getCustomRepository(ProductRespository);
    if (name) {
      const product = await repository.findByName(tid, name);
      if (!product) {
        console.log({ tid: tid, message: 'Product not found' });
        throw new AppError('Product not found');
      }
      return product;
    }
    console.log({ tid: tid, message: 'The name cannot be null' });
    throw new AppError('The name cannot be null');
  }

  async saveProduct(
    tid: string,
    product: IRequestSaveProduct,
  ): Promise<Products> {
    const repository = getCustomRepository(ProductRespository);

    if (product) {
      const productResult = await repository.findByName(tid, product.name);

      if (productResult) {
        console.log({ tid: tid, message: 'Product already exists !' });
        throw new AppError('Product already exists !');
      }

      const productSave = await repository.createProduct(product);

      await repository.saveProduct(tid, productSave);

      return productSave;
    }
    console.log({ tid: tid, message: 'The product cannot be null' });
    throw new AppError('The product cannot be null');
  }
}
