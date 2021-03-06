import { Router } from 'express';

import {
  checkAdmin,
  validateInput,
  Authentication,
  validateIdParams,
  checkRecordExists,
  checkUniqueRecord,
  checkRecordExitsFromBody
} from '../../middlewares';
import model from '../../database/models';
import CategoryController from '../../controllers/category.controller';

const router = Router();
const { Category, Product, Department } = model;

router.post(
  '/categories',
  Authentication.verifyToken,
  checkAdmin,
  validateInput,
  checkUniqueRecord(Category),
  checkRecordExitsFromBody({id: 'department_id', model: Department}),
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

router.get(
  '/categories/inDepartment/:department_id',
  validateIdParams,
  checkRecordExists(Department),
  CategoryController.getDepartmentCategories
);

export default router;
