import { Router } from 'express';
import CustomerController from '../../controllers/customer.controller';
import checkUniqueEmail from '../../middlewares/checkUniqueEmail';
import validateInput from '../../middlewares/validateInput';

const router = Router();
router.post('/customers', validateInput, checkUniqueEmail, CustomerController.create);

router.post('/customers/facebook', validateInput, CustomerController.facebookLogin);

router.post('/customers/login', validateInput, CustomerController.login);

router.post('/customers', CustomerController.updateCreditCard);
router.get('/customer', CustomerController.getCustomerProfile);
router.put('/customer', CustomerController.apply);
router.put('/customer/address', CustomerController.updateCustomerAddress);
router.put('/customer/creditCard', CustomerController.updateCreditCard);

export default router;
