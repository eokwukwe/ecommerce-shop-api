import { Router } from 'express';

import models from '../../database/models';
import checkAdmin from '../../middlewares/checkAdmin';
import validateInput from '../../middlewares/validateInput';
import Authentication from '../../middlewares/authentication';
import validateIdParams from '../../middlewares/validateIdParams';
import checkUniqueRecord from '../../middlewares/checkUniqueRecord';
import DepartmentController from '../../controllers/department.controller';

const router = Router();
const { Department } = models;

router.post(
  '/departments',
  Authentication.verifyToken,
  checkAdmin,
  validateInput,
  checkUniqueRecord(Department),
  DepartmentController.create
);

router.get('/departments', DepartmentController.getAllDepartments);

router.get(
  '/departments/:department_id',
  validateIdParams,
  DepartmentController.getOneDepartment
);

export default router;
