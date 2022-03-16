const User = require('../models/User');

module.exports = {
    async register(request, response){
        const { name, email, password } = request.body;

        let userExists = await User.findOne({email: email}).exec();

        let userResponse = userExists;

        if (!userExists) {
            userResponse = await User.create({
                name, 
                email, 
                password
            });
        }

        response.send(userResponse.email);
    },

    async login(request, response){
        const { email, password }  = request.body;

        User.findOne({email:email}, function(err, userFound)  {
            if (err) throw err;

            userFound.comparePassword(password, function(err, isMatch) {
                if (err) throw err;
                if (isMatch) response.send(userFound)
                else throw new Error("Invalid Password.")
            })
        });

    },

    async logout(request, response){
        
    }

}