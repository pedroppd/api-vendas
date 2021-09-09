import { Products } from '@modules/typeorm/entities/Products';
import { getCustomRepository } from 'typeorm';
import { ProductRespository } from '@modules/typeorm/repositories/ProductRespository';
import { AppError } from '@shared/errors/AppError';

export class ProductService {
  constructor() {}

  public async findByName(name: string) {
    const repository = getCustomRepository(ProductRespository);
    if (name) {
      return await repository.findByName(name);
    }
    throw new AppError('The name cannot be null');
  }
}
