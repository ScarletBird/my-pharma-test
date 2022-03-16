const Product = require('../models/Product');

module.exports = {
    async create(request, response){
        const { name, description, price, stock, productCategory_name, brand_name } = request.body;

        let productExists = await Product.findOne({name: name}).exec();

        let productResponse = productExists;

        if (!productExists) {
            productResponse = await Product.create({
                name, 
                description, 
                price, 
                stock, 
                productCategory_name, 
                brand_name
            });
        }

        response.send(productResponse);
    },

    async read(request, response){

        const productReturnQuery = 
            await Product.find(request.query, 'name description price stock productCategory_name brand_name').exec();

        response.send(productReturnQuery);

    },

    async update(request, response){
        const {name, description, price, stock, productCategory_name, brand_name} = request.body;

        Product.findOne({_id: request.params.id}, (err, foundProduct) =>  {
            if (name !== undefined) {
                foundProduct.name = name;
            }
            if (description !== undefined) {
                foundProduct.description = description;
            }
            if (price !== undefined) {
                foundProduct.price = price;
            }
            if (stock !== undefined) {
                foundProduct.stock = stock;
            }
            if (productCategory_name !== undefined) {
                foundProduct.productCategory_name = productCategory_name;
            }
            if (brand_name !== undefined) {
                foundProduct.brand_name = brand_name;
            }
            foundProduct.save((e, updatedProduct) => {
                if(err) {
                    response.status(400).send(e);
                } else {
                    response.send(updatedProduct)
                }
            })
        })
    },

    async delete(request, response){
        const productReturnQuery = await Product.deleteOne({_id: request.params.id});

        response.send(productReturnQuery);
    }

}