const { GoogleGenAI } = require("@google/genai");
const {Doctor, Appointment} = require("../models");
// const { initializeApp } = require('firebase/app');
const { collection, getDocs, getFirestore } = require('firebase/firestore/lite');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

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
            const {doctorId} = req.params
            const response = await Doctor.findByPk(+doctorId)

            if(!response) throw {name: 'NotFound', message: 'Doctor not found'}

            res.status(200).json(response)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async routeAddAppointment(req, res, next){
        try {
            const {doctorId} = req.params
            const {id} = req.user
            const {date, time, symptoms} = req.body

            const response = await Appointment.create({
                patientId: id,
                doctorId,
                date,
                time,
                symptoms
            })

            const doctorData = await Doctor.findByPk(+doctorId)
            
            res.status(201).json({
                doctor: doctorData.name,
                date,
                time,
                symptoms
            })
            
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async routeGetAppointment(req, res, next){
        try {
            const {id} = req.user

            const response = await Appointment.findAll({
                attributes: {exclude: ['createdAt', 'updatedAt']},
                include: {
                    model: Doctor,
                    attributes: {exclude: ['createdAt', 'updatedAt']}
                },
                where: {
                    patientId: id
                },
                // raw: true
            })

            res.status(200).json(response)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    
    static async routeGetAppointmentById(req, res, next){
        try {
            const {appointmentId} = req.params
            
            const response = await Appointment.findByPk(+appointmentId, {
                attributes: {exclude: ['createdAt', 'updatedAt']},
                include: {
                    model: Doctor,
                    attributes: {exclude: ['createdAt', 'updatedAt']}
                }
            })
            
            res.status(200).json(response)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    
    static async routeDeleteAppoint(req, res, next){
        try {
            const {appointmentId} = req.params
            const response = await Appointment.destroy({
                where: {
                    id: appointmentId
                }
            })
            
            res.status(200).json({message: `Appointment has been deleted`})
            
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async routeUpdateAppoint(req, res, next){
        try {
            // const {date, time, symptoms} = req.body
            const {appointmentId} = req.params
            const response = await Appointment.update(req.body, {
                where: {
                    id: +appointmentId
                }
            })

            res.status(200).json({message: `Appointment with id ${appointmentId} has been updated`})

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async routeChangeStatus(req, res, next){
        try {
            const {appointmentId} = req.params
            const response = await Appointment.update({
                status: 'confirmed'
            }, {
                where: {
                    id: +appointmentId
                }
            })

            console.log(typeof appointmentId);
            console.log(response);

            res.status(200).json({message: `status has been updated`})

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async routeGetHealthCare(req, res, next){
        const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
        try {
            let response = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: `
                    berikan saya rekomendasi tips hidup sehat sehari-hari
                    tampilkan dalam bentuk data json seperti dibawah ini
                    [
                        {
                            title: string
                        }
                    ]
                    berikan 5 data saja
                    hanya tampilkan data json itu saja jangan ada data lain
                `,
              });
              const result = response.text.replace("```json", "").replace("```", "")
              console.log(response.text);
              res.status(200).send(result)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    
    static async routeGetFromFirebase(req, res, next){
        try {
                const doctorColl = collection(db, 'Doctors')
                const querySnapshot = (await getDocs(doctorColl)).docs.map(doc => doc.data()) 
    
                res.json(querySnapshot)
            } catch (error) {
                console.log(error);
            }
    }
}

module.exports = Controller