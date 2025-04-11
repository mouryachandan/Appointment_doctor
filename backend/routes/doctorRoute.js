import express from 'express'
import { doctorList, changeAvailablity, doctorLogin } from '../controllers/doctorController.js'

const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', doctorLogin) // 👈 Added route
doctorRouter.post('/change-availablity', changeAvailablity)

export default doctorRouter
