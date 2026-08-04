import { Router } from 'express';
import { ClassController } from '../controllers/ClassController';
import { ClassService } from '../services/ClassService';

const router = Router();

const classService = new ClassService();
const classController = new ClassController(classService);

router.get('/', classController.getAllClasses);
router.post('/', classController.createClass);

export { router as classRoutes };
