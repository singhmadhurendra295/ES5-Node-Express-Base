const {userServices} = require('../api/services');

class CommonFunctions {

    async validateEmail(payload) {        
        try {
            let query = { email: payload.email };
            let users = await userServices.findUser(query);
            return users;
        } catch (err) {
            throw new Error(err);
        }

    }
}

module.exports = new CommonFunctions();