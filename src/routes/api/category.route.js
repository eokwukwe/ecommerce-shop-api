import { Router } from 'express';

import {
  checkAdmin,
  validateInput,
  Authentication,
  validateIdParams,
  checkRecordExists,
  checkUniqueRecord,
  checkForDepartment,
} from '../../middlewares';
import model from '../../database/models';
import CategoryController from '../../controllers/category.controller';

const router = Router();
const { Category, Product } = model;

router.post(
  '/categories',
  Authentication.verifyToken,
  checkAdmin,
  validateInput,
  checkUniqueRecord(Category),
  checkForDepartment,
  CategoryController.create
);

router.get(
  '/categories',
  CategoryController.getAllCategories
);

router.get(
  '/categories/:category_id',
  validateIdParams,
  checkRecordExists(Category),
  CategoryController.getCategoryById
);

router.get(
  '/categories/inProduct/:product_id',
  validateIdParams,
  checkRecordExists(Product),
  CategoryController.getProductCategories
);

export default router;
