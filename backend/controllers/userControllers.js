const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const {User} = require("../models");

class UserController {

    static async routeRegister(req, res, next){
        try {
            const {name, email, phone, password} = req.body

            const response = await User.create({name, email, phone, password})
            console.log(response);
            res.status(201).json({
                id: response.id,
                name: response.name,
                email: response.email,
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async routeLogin(req, res, next){
        try {
            const {email, password} = req.body

            if(!email) throw {name: 'BadRequest', message: 'Email is required'}

            if(!password) throw {name: 'BadRequest', message: 'Password is required'}

            const response = await User.findOne({
                where: {
                    email
                }
            })

            if(!response) throw {name: 'BadRequest', message: 'Invalid email / password'}

            const isValidPass = comparePassword(password ,response.password)

            if(!isValidPass) throw {name: 'BadRequest', message: 'Invalid email / password'}

            const token = generateToken({id: response.id})

            res.status(200).json({access_token: token})

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

}

module.exports = UserController