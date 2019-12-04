import { Router } from 'express';

import model from '../../database/models';
import checkAdmin from '../../middlewares/checkAdmin';
import validateInput from '../../middlewares/validateInput';
import Authentication from '../../middlewares/authentication';
import validateIdParams from '../../middlewares/validateIdParams';
import checkUniqueRecord from '../../middlewares/checkUniqueRecord';
import checkForDepartment from '../../middlewares/checkForDepartment';
import CategoryController from '../../controllers/category.controller';

const router = Router();
const { Category } = model;

router.post(
  '/categories',
  Authentication.verifyToken,
  checkAdmin,
  validateInput,
  checkUniqueRecord(Category),
  checkForDepartment,
  CategoryController.create
);

router.get('/categories', CategoryController.getAllCategories);

// router.get(
//   '/categories/:id',
//   validateIdParams,
//   DepartmentController.getOneDepartment
// );

export default router;
