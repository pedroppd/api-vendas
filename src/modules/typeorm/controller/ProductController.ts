import { Request, Response } from 'express';
import { ProductService } from '@modules/typeorm/services/ProductService';
import { AppError } from '@shared/errors/AppError';
import { IRequestSaveProduct } from '@modules/interfaces/IRequestSaveProduct';
import { v4 as uuid } from 'uuid';

export class ProductController {
  private productService: ProductService;
  private readonly tid: string;

  constructor() {
    this.tid = uuid();
    this.productService = new ProductService();
  }

  public async findByName(req: Request, res: Response) {
    try {
      const name = req.params.name;
      const result = await this.productService.findByName(this.tid, name);
      res.status(200).json({ body: result });
    } catch (Error) {
      return new AppError('Product not found', 404);
    }
  }

  public async saveProduct(req: Request, res: Response) {
    try {
      const product = req.body as IRequestSaveProduct;
      const productCreated = await this.productService.saveProduct(
        this.tid,
        product,
      );
      res.status(201).json({ body: productCreated });
    } catch (err: any) {
      const status = err.status || 500;
      console.log({ tid: this.tid, message: err.message });
      res.setHeader('X-TRANSACTION-UUID', this.tid);
      res.status(status).json({ message: err.message });
    }
  }
}
