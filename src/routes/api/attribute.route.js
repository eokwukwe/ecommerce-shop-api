import { Router } from 'express';

import {
  checkAdmin,
  validateInput,
  Authentication,
  validateIdParams,
  checkRecordExists,
  checkUniqueRecord,
} from '../../middlewares';
import model from '../../database/models';
import AttributeController from '../../controllers/attributes.controller';

const router = Router();
const { Attribute} = model;

router.post(
  '/attributes',
  Authentication.verifyToken,
  checkAdmin,
  validateInput,
  checkUniqueRecord(Attribute),
  AttributeController.create
);

router.post(
  '/attributes/:attribute_id/values',
  Authentication.verifyToken,
  checkAdmin,
  validateInput,
  validateIdParams,
  checkRecordExists(Attribute),
  AttributeController.addAttributeValue
);

router.get('/attributes', AttributeController.getAllAttributes);
// router.get('/attributes/:attribute_id', AttributeController.getSingleAttribute);
// router.get('/attributes/:attribute_id/values', AttributeController.getAttributeValues);
// router.get('/attributes/inProduct/:product_id', AttributeController.getProductAttributes);

export default router;
