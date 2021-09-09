import { Request, Response } from 'express';
import { ProductService } from '@modules/typeorm/services/ProductService';
import { AppError } from '@shared/errors/AppError';

export class ProductController {
  public async findByName(req: Request, res: Response) {
    try {
      const name = req.params.name;
      console.log(`Find name: ${name}`);
      const productService = new ProductService();
      const result = await productService.findByName(name);
      res.status(200).json({ body: result });
    } catch (Error) {
      return new AppError('Product not found', 404);
    }
  }
}
