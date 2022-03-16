const Brand = require('../models/Brand');

module.exports = {
    async create(request, response){
        const { name } = request.body;

        let BrandExists = await Brand.findOne({name: name}).exec();

        let BrandResponse = BrandExists;

        if (!BrandExists) {
            BrandResponse = await Brand.create({ name });
        }

        response.send(BrandResponse);
    },

    async read(request, response){

        const BrandReturnQuery = 
            await Brand.find(request.query, 'name').exec();

        response.send(BrandReturnQuery);

    },

    async update(request, response){
        const { name } = request.body;

        const BrandReturnQuery = await Brand.findOneAndUpdate({_id: request.params.id}, {name}, {new: true});

        response.send(BrandReturnQuery);
    },

    async delete(request, response){
        const BrandReturnQuery = await Brand.deleteOne({_id: request.params.id});

        response.send(BrandReturnQuery);
    }

}