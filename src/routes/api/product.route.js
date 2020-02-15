import { Router } from 'express';

import {
  checkAdmin,
  validateInput,
  Authentication,
  validateIdParams,
  checkRecordExists,
  checkRecordExitsFromBody,
  checkUniqueRecord,
} from '../../middlewares';
import model from '../../database/models';
import ProductController from '../../controllers/product.controller';

const router = Router();
const { Product, Category, AttributeValue } = model;

router.post(
  '/products',
  Authentication.verifyToken,
  checkAdmin,
  validateInput,
  checkUniqueRecord(Product),
  checkRecordExitsFromBody({ id: 'category_id', model: Category }),
  checkRecordExitsFromBody({ id: 'attribute_value_id', model: AttributeValue }),
  ProductController.create
);

export default router;

