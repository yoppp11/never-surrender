const express = require('express')
const UserController = require('../controllers/UserControllers')
const { errorMiddleware } = require('../middlewares/errorHandler')
const { authMiddleware } = require('../middlewares/authentication')
const Controller = require('../controllers/Controllers')
const router = express.Router()

router.post('/register', UserController.routeRegister)
router.post('/login', UserController.routeLogin)

router.use(authMiddleware)

router.get('/doctors', Controller.routeGetAll)
router.get('/doctors/:id', Controller.routeGetId)

router.use(errorMiddleware)

module.exports = router