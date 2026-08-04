import { Router } from 'express';
import { TeacherController } from '../controllers/TeacherController';
import { TeacherService } from '../services/TeacherService';

const router = Router();

const teacherService = new TeacherService();
const teacherController = new TeacherController(teacherService);

router.get('/', teacherController.getAllTeachers);
router.post('/', teacherController.createTeacher);

export { router as teacherRoutes };
