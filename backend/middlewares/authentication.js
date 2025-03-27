const { compareToken } = require("../helpers/jwt")
const {User} = require("../models")

async function authMiddleware(req, res, next){
    try {
        // console.log(req.headers);
        const {authorization} = req.headers

        if(!authorization) throw {name: 'Unauthorized', message: 'Invalid token'}

        const token = authorization.split(' ')
        if(token[0] !== 'Bearer' || !token[1]) throw {name: 'Unauthorized', message: 'Invalid token'}

        const isValidToken = compareToken(token[1])

        if(!isValidToken) throw {name: 'Unauthorized', message: 'Invalid token'}
        console.log(isValidToken);

        if(isValidToken.role === 'dokter'){
            req.user = {
                id: isValidToken.id
            }
            next()
            return 
        }

        const userData = await User.findByPk(isValidToken.id)
        if(!userData) throw {name: 'Unauthorized', message: 'Invalid token'}

        req.user = {
            id: isValidToken.id
        }
        next()

    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports = {
    authMiddleware
}