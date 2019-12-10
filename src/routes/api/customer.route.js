import { Router } from 'express';

import CustomerController from '../../controllers/customer.controller';
import {
  findCustomer,
  validateInput,
  Authentication,
  checkUniqueEmail,
  findShippingRegion,
} from '../../middlewares'

const router = Router();
router.post(
  '/customers',
  validateInput,
  checkUniqueEmail,
  CustomerController.create
);

router.post(
  '/customers/facebook',
  validateInput,
  CustomerController.facebookLogin
);

router.post(
  '/customers/login',
  validateInput,
  CustomerController.login
);

router.get(
  '/customers',
  Authentication.verifyToken,
  CustomerController.getCustomerProfile
);

router.put(
  '/customers/creditCard',
  Authentication.verifyToken,
  findCustomer,
  validateInput,
  CustomerController.updateCreditCard
);

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
