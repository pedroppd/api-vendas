import { Router } from 'express';
import { ProductController } from '@modules/typeorm/controller/ProductController';
const productController = new ProductController();
const routes = Router();

//healthCheck
routes.get('/api-vendas/healthCheck', (req, res) => {
  res.send('Funcionando');
});

//PRODUCT
routes.get('/api-vendas/product/:name', productController.findByName);

export default routes;
