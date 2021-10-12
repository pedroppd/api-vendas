import { getCustomRepository } from 'typeorm';
import { IRequestSaveProduct } from '@repositories/product/IRequestSaveProduct';
import { AppError } from '@errors/AppError';
import { Product } from '@entities/Product';
import { ProductRespository } from '@repositories/product/ProductRespository';
import { validate } from 'uuid';

export class ProductService {
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
  ): Promise<Product> {
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

  async updateProduct(
    tid: string,
    productUuid: string,
    product: IRequestSaveProduct,
  ): Promise<void> {
    const repository = getCustomRepository(ProductRespository);

    if (product) {
      if (!validate(productUuid)) {
        console.log({
          tid: tid,
          message: `The uuid: ${productUuid} is invalid`,
        });
        throw new AppError(`The uuid: ${productUuid} is invalid`);
      }

      const productResult = await repository.findByUuid(tid, productUuid);

      if (!productResult) {
        console.log({ tid: tid, message: 'Product not exists !' });
        throw new AppError('Product not exists !');
      }

      const productSave = await repository.createProduct(product, true);

      await repository.updateProduct(tid, productSave, productUuid);
    } else {
      console.log({ tid: tid, message: 'The product cannot be null' });
      throw new AppError('The product cannot be null');
    }
  }

  async deleteProduct(tid: string, productUuid: string): Promise<void> {
    const repository = getCustomRepository(ProductRespository);

    if (!validate(productUuid)) {
      console.log({
        tid: tid,
        message: `The uuid: ${productUuid} is invalid`,
      });
      throw new AppError(`The uuid: ${productUuid} is invalid`);
    }

    const productResult = await repository.findByUuid(tid, productUuid);

    if (!productResult) {
      console.log({ tid: tid, message: 'Product not exists !' });
      throw new AppError('Product not exists !');
    }

    const productDeleteUpdate = await repository.createDeleteProduct();

    await repository.updateProduct(tid, productDeleteUpdate, productUuid);
  }
}
