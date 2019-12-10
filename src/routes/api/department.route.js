import { Router } from 'express';

import {
  checkAdmin,
  validateInput,
  Authentication,
  validateIdParams,
  checkRecordExists,
  checkUniqueRecord,
} from '../../middlewares';
import models from '../../database/models';
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
  checkRecordExists(Department),
  DepartmentController.getDepartmentById
);

export default router;
