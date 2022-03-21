const User = require('../models/User');

const getSignedToken = require('../util/signedToken');

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
            response.send(userResponse.email);
        } else {
            throw new Error("User already registered.")
        }

    },

    async login(request, response){
        const { email, password }  = request.body;

        User.findOne({email:email}, function(err, userFound)  {
            if (err) throw Error("User not found!");

            userFound.comparePassword(password, function(err, isMatch) {
                if (err) throw Error("Password unmatch!");
                console.log("Password ok!");

                if (isMatch) {
                    console.log("Match ok!");
                    const token = getSignedToken(userFound._id);
                    console.log("token ok")
                    response.send(token);
                }
                else throw new Error("Invalid Password.")
            })
        });

    },

    async logout(request, response){
        
    }

}