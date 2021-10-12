import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { ProductService } from '@services/ProductService';
import { IRequestSaveProduct } from '@repositories/product/IRequestSaveProduct';

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
    } catch (err: any) {
      const status = err.status || 500;
      console.log({ tid: this.tid, message: err.message });
      res.setHeader('X-TRANSACTION-UUID', this.tid);
      res.status(status).json({ message: err.message });
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

  public async updateProduct(req: Request, res: Response) {
    try {
      const product = req.body as IRequestSaveProduct;
      const uuid = req.params.productUuid;

      await this.productService.updateProduct(this.tid, uuid, product);

      res.status(200).json({ message: 'Product updated successfully' });
    } catch (err: any) {
      const status = err.status || 500;
      console.log({ tid: this.tid, message: err.message });
      res.setHeader('X-TRANSACTION-UUID', this.tid);
      res.status(status).json({ message: err.message });
    }
  }

  public async deleteProduct(req: Request, res: Response) {
    try {
      const uuid = req.params.productUuid;

      await this.productService.deleteProduct(this.tid, uuid);

      res.status(200).json({ message: 'Product delete successfully' });
    } catch (err: any) {
      const status = err.status || 500;
      console.log({ tid: this.tid, message: err.message });
      res.setHeader('X-TRANSACTION-UUID', this.tid);
      res.status(status).json({ message: err.message });
    }
  }
}
