const { OAuth2Client } = require("google-auth-library");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const {User, Doctor} = require("../models");

const client = new OAuth2Client();
const CLIENT_ID = process.env.CLIENT_ID

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

    static async routeAdmin(req, res, next){
        try {
            const {name} = req.body

            const response = await Doctor.findOne({
                where: {
                    name
                }
            })

            if(!response) throw {name: 'NotFound', message: 'Doctor not found'}

            console.log(response);
            const token = generateToken({id: response.id, role: 'dokter'})


            res.status(200).json({access_token: token})

        } catch (error) {
            console.log(error);
            next(error)
            
        }
    }

    static async routeGoogleLogin(req, res, next){
        try {
            const {googleToken} = req.body

            const ticket = await client.verifyIdToken({
                idToken: googleToken,
                audience: CLIENT_ID,
            });
            const payload = ticket.getPayload();
            // const userid = payload['sub'];

            const response = await User.findOrCreate({
                where: {
                    email: payload.email
                },
                defaults: {
                    name: payload.name,
                    email: payload.email,
                    password: '3-145=1=34051=-58PRABOWOWWOWOWOWOWOWOWOWSKDFSD0F'
                }
            })

            const access_token = generateToken({id: response[0].id})

            res.status(200).json({access_token})

            console.log(payload);
            console.log(response);
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

}

module.exports = UserController