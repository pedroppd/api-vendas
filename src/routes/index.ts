import { Router, Request, Response } from 'express';
import { ProductController } from '@controller/ProductController';

const productController = new ProductController();

const routes = Router();

//healthCheck
routes.get('/api-vendas/healthCheck', (req, res) => {
  res.send('healthCheck is running');
});

//PRODUCT
routes.get('/api-vendas/product/:name', (req: Request, res: Response) => {
  productController.findByName(req, res);
});

routes.post('/api-vendas/product', (req: Request, res: Response) => {
  productController.saveProduct(req, res);
});

export default routes;
