import express from 'express'
import customerController from '../controllers/customerController.js'

const router = express.Router()

router.get('/id/:id', customerController.getCustomerById)
router.post('/', customerController.createCustomer)
router.get('/:input', customerController.getCustomers)
router.put('/:id', customerController.updateCustomer)

export default router
