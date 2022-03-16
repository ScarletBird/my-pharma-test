const ProductCategory = require('../models/ProductCategory');

module.exports = {
    async create(request, response){
        const { name, description } = request.body;

        let productCategoryExists = await ProductCategory.findOne({name: name}).exec();

        let productCategoryResponse = productCategoryExists;

        if (!productCategoryExists) {
            productCategoryResponse = await ProductCategory.create({
                name,
                description
            });
        }

        response.send(productCategoryResponse);
    },

    async read(request, response){

        const productCategoryReturnQuery = 
            // getProductCategoryWithQuery(request.query);
            await ProductCategory.find(request.query, 'name description').exec();

        response.send(productCategoryReturnQuery);
    },

    async update(request, response){
        const {name, description} = request.body;

        ProductCategory.findOne({_id: request.params.id}, (err, foundProductCategory)  =>  {
            if (name !== undefined) {
                foundProductCategory.name = name;
            }
            if (description !== undefined) {
                foundProductCategory.description = description;
            }
            foundProductCategory.save((e, updatedProductCategory) => {
                if(err) {
                    response.status(400).send(e);
                } else {
                    response.send(updatedProductCategory)
                }
            })
        });
    },

    async delete(request, response){
        const productCategoryReturnQuery = await ProductCategory.deleteOne({_id: request.params.id});

        response.send(productCategoryReturnQuery);
    }

}