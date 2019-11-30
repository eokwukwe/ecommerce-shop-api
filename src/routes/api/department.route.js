import { Router } from 'express';
import DepartmentController from '../../controllers/department.controller';
import checkAdmin from '../../middlewares/checkAdmin';
import checkDepartment from '../../middlewares/checkDepartment';
import Authentication from '../../middlewares/authentication';
import validateInput from '../../middlewares/validateInput';

const router = Router();

router.post(
  '/departments',
  Authentication.verifyToken,
  checkAdmin,
  validateInput,
  checkDepartment,
  DepartmentController.create
);

router.get('/departments', DepartmentController.getAllDepartments);

export default router;
