import { Request, Response, NextFunction } from 'express';
import { ClassService } from '../services/ClassService';
import { CreateClassDTO } from '../models/Class';

export class ClassController {
  private classService: ClassService;

  constructor(classService: ClassService) {
    this.classService = classService;
  }

  getAllClasses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const classes = await this.classService.findAll();
      res.status(200).json({ data: classes });
    } catch (error) {
      next(error);
    }
  };

  createClass = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const classData: CreateClassDTO = req.body;

      if (!this.validateClassData(classData)) {
        res.status(400).json({ 
          error: 'Missing required fields: level, name, or teacherId' 
        });
        return;
      }

      const existingClass = await this.classService.findByTeacherId(classData.teacherEmail);
      if (existingClass) {
        res.status(409).json({ 
          error: 'Teacher is already assigned as form teacher for another class' 
        });
        return;
      }

      const newClass = await this.classService.createClass(classData);
      res.status(201).json(newClass);
    } catch (error) {
      next(error);
    }
  };

  private validateClassData(data: CreateClassDTO): boolean {
    return (
      typeof data.level === 'string' &&
      data.level.trim() !== '' &&
      typeof data.name === 'string' &&
      data.name.trim() !== '' &&
      typeof data.teacherEmail === 'string' &&
      data.teacherEmail.trim() !== ''
    );
  }
}
