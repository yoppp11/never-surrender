const {Doctor} = require("../models");

class Controller {
    static async routeGetAll(req, res, next){
        try {
            const response = await Doctor.findAll()

            res.status(200).json(response)

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async routeGetId(req, res, next){
        try {
            const {id} = req.params
            const response = await Doctor.findByPk(+id)
            res.status(200).json(response)
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = Controller