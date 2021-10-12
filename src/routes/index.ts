import { Router, Request, Response } from 'express';
import { ProductController } from '@controller/ProductController';

const productController = new ProductController();

const routes = Router();

//healthCheck
routes.get('/product-service/healthCheck', async (req, res) => {
  await res.send('healthCheck is running');
});

//PRODUCT
routes.get(
  '/product-service/product/:name',
  async (req: Request, res: Response) => {
    await productController.findByName(req, res);
  },
);

routes.post('/product-service/product', async (req: Request, res: Response) => {
  await productController.saveProduct(req, res);
});

routes.put(
  '/product-service/:productUuid/product',
  async (req: Request, res: Response) => {
    await productController.updateProduct(req, res);
  },
);

routes.delete(
  '/product-service/:productUuid/product',
  async (req: Request, res: Response) => {
    await productController.deleteProduct(req, res);
  },
);

export default routes;
