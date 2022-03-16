const { Router } = require('express');
const ProductCategoryController = require('./controllers/ProductCategoryController');
const BrandController = require('./controllers/BrandController');
const ProductController = require('./controllers/ProductController');



const routes = Router();

routes.get('/product-category', ProductCategoryController.read);
routes.post('/product-category', ProductCategoryController.create);
routes.put('/product-category/:id', ProductCategoryController.update);
routes.delete('/product-category/:id', ProductCategoryController.delete);

routes.get('/brand', BrandController.read);
routes.post('/brand', BrandController.create);
routes.put('/brand/:id', BrandController.update);
routes.delete('/brand/:id', BrandController.delete);

routes.get('/product', ProductController.read);
routes.post('/product', ProductController.create);
routes.put('/product/:id', ProductController.update);
routes.delete('/product/:id', ProductController.delete);

module.exports = routes;