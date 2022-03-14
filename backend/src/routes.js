const { Router } = require('express');
const ProductCategoryController = require('./controllers/ProductCategoryController');

const routes = Router();

routes.get('/product-category', ProductCategoryController.read);
routes.post('/product-category', ProductCategoryController.create);
routes.put('/product-category/:id', ProductCategoryController.update);
routes.delete('/product-category/:id', ProductCategoryController.delete);

module.exports = routes;