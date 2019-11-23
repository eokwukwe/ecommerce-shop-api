import { Router } from 'express';
import CustomerController from '../../controllers/customer.controller';
import checkUniqueEmail from '../../middlewares/checkUniqueEmail';
import findCustomer from '../../middlewares/findCustomer';
import Authentication from '../../middlewares/authentication';
import validateInput from '../../middlewares/validateInput';
import { findShippingRegion } from '../../middlewares/findShipping';

const router = Router();
router.post('/customers', validateInput, checkUniqueEmail, CustomerController.create);

router.post('/customers/facebook', validateInput, CustomerController.facebookLogin);

router.post('/customers/login', validateInput, CustomerController.login);

router.put(
  '/customers/creditCard',
  Authentication.verifyToken,
  findCustomer,
  validateInput,
  CustomerController.updateCreditCard
);
// router.get('/customer', CustomerController.getCustomerProfile);

router.put(
  '/customers/address',
  Authentication.verifyToken,
  findCustomer,
  validateInput,
  findShippingRegion,
  CustomerController.updateCustomerAddress
);

router.put(
  '/customers/profile',
  Authentication.verifyToken,
  findCustomer,
  validateInput,
  CustomerController.updateCustomerProfile
);

export default router;
