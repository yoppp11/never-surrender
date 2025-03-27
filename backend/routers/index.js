const express = require('express')
const UserController = require('../controllers/userController')
const { errorMiddleware } = require('../middlewares/errorHandler')
const { authMiddleware } = require('../middlewares/authentication')
const Controller = require('../controllers/controller')
const router = express.Router()

router.post('/register', UserController.routeRegister)
router.post('/login', UserController.routeLogin)
router.post('/google', UserController.routeGoogleLogin)

router.use(authMiddleware)

router.get('/doctors', Controller.routeGetAll)
router.get('/appointments', Controller.routeGetAppointment)
router.get('/doctors/firebase', Controller.routeGetFromFirebase)
router.get('/ai/reccomendations', Controller.routeGetHealthCare)
router.get('/doctors/:doctorId', Controller.routeGetId)
router.post('/appointments/:doctorId', Controller.routeAddAppointment)
router.get('/appointments/:appointmentId', Controller.routeGetAppointmentById)
router.put('/appointments/:appointmentId', Controller.routeUpdateAppoint)
router.delete('/appointments/:appointmentId', Controller.routeDeleteAppoint)
router.patch('/appointments/:appointmentId', Controller.routeChangeStatus)

router.use(errorMiddleware)

module.exports = router