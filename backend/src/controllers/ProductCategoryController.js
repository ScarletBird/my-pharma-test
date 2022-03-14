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

        return response.json(productCategoryResponse);
    },

    async read(request, response){

        async function getProductCategoryWithQuery(query) {
            if (query.name && query.description){
                console.log('hello');
                return await ProductCategory.find({name: query.name, description: query.description}, 'name description').exec();
            } else {
                if (query.name)
                    return await ProductCategory.find({name: query.name}, 'name description').exec();
                else if (query.description)
                    return await ProductCategory.find({description: query.description}, 'name description').exec();
                else
                    return await ProductCategory.find({}, 'name description').exec();
            }
        }

        const productCategoryReturnQuery = 
            getProductCategoryWithQuery(request.query);

        productCategoryReturnQuery.then(function(productCategories){
            response.send(productCategories)
        })
    },

    async update(request, response){
        const {name, description} = request.body;

        console.log(request.params.id);

        const productCategoryReturnQuery = await ProductCategory.findOneAndUpdate({_id: request.params.id}, {name, description}, {new: true});

        return response.json(productCategoryReturnQuery)
    },

    async delete(request, response){
        const productCategoryReturnQuery = await ProductCategory.deleteOne({_id: request.params.id});

        return response.json(productCategoryReturnQuery)
    }

}